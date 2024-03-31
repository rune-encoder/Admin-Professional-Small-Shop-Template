const { Admin, Shop, Category, Product, Order, Guest } = require("../models");

const { signToken } = require("../utils/authentication");
const { checkPermission, adminLevel } = require("../utils/adminPermissions");

const {
  AuthenticationError,
  ForbiddenError,
  ApolloError,
} = require("apollo-server-express");

const { uploadImages, cloudConfig } = require("../utils/imageUploader");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// const fs = require("fs");
// ! const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

// CHECK IF THE ADMIN IS LOGGED IN AND HAS THE REQUIRED PERMISSION:
// MUST BE LOGGED IN. DEFAULT: "VIEWER"
const withAuth = (resolverFunction, requiredPermission) => {
  return async (parent, args, context, info) => {
    if (!context.admin) {
      throw new AuthenticationError("Admin must be logged in!");
    }
    checkPermission(context.admin, requiredPermission);
    return resolverFunction(parent, args, context, info);
  };
};

// QUERY HELPER FUNCTION: USES SELECTED FILTERS TO CREATE A QUERY
const createQueryFromFilters = (filters) => {
  const query = {};

  for (let key in filters) {
    if (filters[key]) {
      query[key] = filters[key];
    }
  }

  return query;
};

// QUERY HELPER FUNCTION (SPECIFIC TO ORDERS): USES SELECTED FILTERS TO CREATE A QUERY
const createQueryForOrders = (filters) => {
  const query = {};

  for (let key in filters) {
    const value = filters[key];

    if (value) {
      if (key === "products") {
        value.forEach((item) => {
          for (let subKey in item) {
            query[`products.${subKey}`] = item[subKey];
          }
        });
      } else {
        query[key] = value;
      }
    }
  }

  return query;
};

const resolvers = {
  Query: {
    getAdmin: withAuth(async (parent, { _id }, context) => {
      return await Admin.findById(_id);
    }, adminLevel.OWNER),

    getAdmins: withAuth(async (parent, { filters }, context) => {
      const query = createQueryFromFilters(filters);
      return await Admin.find(query);
    }, adminLevel.OWNER),

    getCategories: withAuth(async (parent, args, context) => {
      return await Category.find();
    }),

    getProduct: withAuth(async (parent, { _id }, context) => {
      return await Product.findById(_id).populate("category");
    }),

    getProducts: withAuth(async (parent, { filters }, context) => {
      const query = createQueryFromFilters(filters);
      return await Product.find(query).populate("category");
    }),

    getOrder: withAuth(async (parent, { _id }, context) => {
      return await Order.findById(_id).populate({
        path: "products.product",
        populate: "category",
      });
    }, adminLevel.MANAGER),

    getOrders: withAuth(async (parent, { filters }, context) => {
      const query = createQueryForOrders(filters);
      return await Order.find(query)
        .sort({ purchaseDate: -1 })
        .populate({ path: "products.product", populate: "category" });
    }, adminLevel.MANAGER),
  },

  Mutation: {
    adminLogin: async (parent, { username, password }) => {
      const admin = await Admin.findOne({ username });

      if (!admin) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(admin);

      return { token, admin };
    },

    adminCreate: withAuth(async (parent, args, context) => {
      // Prevent creation of the "OWNER" permission level
      if (args.permission === adminLevel.OWNER) {
        throw new ForbiddenError("Permission level is locked.");
      }

      return await Admin.create(args);
    }, adminLevel.OWNER),

    adminUpdate: withAuth(async (parent, args, context) => {
      // Prevents permission level from being updated to "OWNER" (locked)
      if (args.permission === adminLevel.OWNER) {
        throw new ForbiddenError("Permission level is locked");
      }

      const adminData = await Admin.findById(args._id);

      // Prevents modification of the "OWNER" permission level to a lower level.
      if (
        adminData.permission === adminLevel.OWNER &&
        args.permission !== adminLevel.OWNER
      ) {
        throw new ForbiddenError(
          "Permission level is the highest level and cannot be lowered."
        );
      }

      // If the field is specified in the args, update the field in the adminData object
      // Exclude the password field, which is handled separately
      const fieldsToUpdate = ["username", "email", "permission"];

      fieldsToUpdate.forEach((field) => {
        if (args[field]) {
          adminData[field] = args[field];
        }
      });

      // If the password is being updated, encrypt it before saving to the database
      if (args.password) {
        adminData.password = args.password;
        adminData.markModified("password");
      }

      // Save the updated adminData object to the database
      await adminData.save();
      return adminData;
    }, adminLevel.OWNER),

    adminDelete: withAuth(async (parent, { _id }, context) => {
      return await Admin.findByIdAndDelete(_id);
    }, adminLevel.OWNER),

    createCategory: withAuth(async (parent, args, context) => {
      return await Category.create(args);
    }, adminLevel.EDITOR),

    updateCategory: withAuth(async (parent, { _id, name }, context) => {
      return await Category.findByIdAndUpdate(
        _id,
        { name },
        { new: true, runValidators: true }
      );
    }, adminLevel.EDITOR),

    deleteCategory: withAuth(async (parent, { _id }, context) => {
      return await Category.findByIdAndDelete(_id);
    }, adminLevel.EDITOR),

    createProduct: withAuth(async (parent, { input }, context) => {
      try {
        // !DO NOT DELETE: WORKING CODE
        // Configure Cloudinary with the cloudConfig object
        // cloudinary.config(cloudConfig);

        // Upload the images to Cloudinary and get the results
        // const results = await uploadImages(input.image);

        // Create an array of objects with the cloudinary ID and URL
        // const imageParams = results.map(result => ({
        //   cloudinaryId: result.asset_id,
        //   url: result.url, 
        // Public (Choose private [secure_url] or public [url] URL)
        // }));

        // !Delete and Uncomment top when done fixing category issue. 
        const imageParams = [
          {
            cloudinaryId: "sampleId3",
            url: "https://res.cloudinary.com/ddx7byopv/image/upload/v1699819601/samples/shoe.jpg",
          },
          {
            cloudinaryId: "sampleId4",
            url: "https://res.cloudinary.com/ddx7byopv/image/upload/v1699819606/samples/cup-on-a-table.jpg",
          },
        ];
        // !=========================================

        // Replace the image array of strings with the object with the returned cloudinary ID and URL
        input.image = imageParams;

        // Save the product to the database
        const product = await Product.create(input);

        return product;
      } catch (error) {
        throw new ApolloError("Error creating product", error);
      }
    }, adminLevel.EDITOR),

    updateProduct: withAuth(async (parent, { _id, input }, context) => {
      return await Product.findByIdAndUpdate(_id, input, {
        new: true,
        runValidators: true,
      });
    }, adminLevel.EDITOR),

    deleteProduct: withAuth(async (parent, { _id }, context) => {
      return await Product.findByIdAndDelete(_id);
    }, adminLevel.EDITOR),
  },
};

module.exports = resolvers;
