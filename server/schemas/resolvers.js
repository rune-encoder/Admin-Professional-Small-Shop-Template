const { Admin, Shop, Category, Product, Order, Guest } = require("../models");

const { signToken } = require("../utils/authentication");
const { checkPermission, adminLevel } = require("../utils/adminPermissions");

const { AuthenticationError } = require("apollo-server-express");

// const { uploadImage, cloudConfig } = require("../utils/imageUploader");
// require("dotenv").config();
// const fs = require("fs");
// const cloudinary = require("cloudinary").v2;
// ! const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

// CHECK IF THE ADMIN IS LOGGED IN AND HAS THE REQUIRED PERMISSION
// SYNTAX: query/resolver: withAuth(resolverFunction, requiredPermission = (default) "viewer"))
const withAuth = (resolverFunction, requiredPermission) => {
  return async (parent, args, context, info) => {
    if (!context.admin) {
      throw new AuthenticationError("Admin must be logged in!");
    }
    checkPermission(context.admin, requiredPermission);
    return resolverFunction(parent, args, context, info);
  };
};

const resolvers = {
  Query: {
    admin: withAuth(async (parent, { _id }, context) => {
      return await Admin.findById(_id);
    }, adminLevel.OWNER),

    admins: withAuth(async (parent, { filters }, context) => {
      const query = {};

      for (let key in filters) {
        if (filters[key]) {
          query[key] = filters[key];
        }
      }

      return await Admin.find(query);
    }, adminLevel.OWNER),

    categories: withAuth(async (parent, args, context) => {
      return await Category.find();
    }),

    product: withAuth(async (parent, { _id }, context) => {
      return await Product.findById(_id).populate("category");
    }),

    products: withAuth(async (parent, { filters }, context) => {
      const query = {};

      for (let key in filters) {
        if (filters[key]) {
          query[key] = filters[key];
        }
      }

      return await Product.find(query).populate("category");
    }),

    order: withAuth(async (parent, { _id }, context) => {
      return await Order.findById(_id).populate({
        path: "products.product",
        populate: "category",
      });
    }, adminLevel.MANAGER),

    orders: withAuth(async (parent, { filters }, context) => {
      const query = {};

      for (let key in filters) {
        // Checks the filters object. If value is falsy, it will skip the key and move on to the next key in the object.
        if (filters[key]) {
          // If the key is "products", it will loop through the array of products and add each product to the query object.
          if (key === "products") {
            filters[key].forEach((item) => {
              for (let subKey in item) {
                query[`products.${subKey}`] = item[subKey];
              }
            });
            // If the key is another field, it will add the key and value to the query object.
          } else {
            query[key] = filters[key];
          }
        }
      }

      return await Order.find(query)
        .sort({ purchaseDate: -1 })
        .populate({ path: "products.product", populate: "category" });
    }, adminLevel.MANAGER),
  },

  Mutation: {
    adminLogin: async (parent, { username, password }) => {
      const admin = await Admin.findOne({ username });

      if (!admin) {
        throw AuthenticationError("Incorrect credentials");
      }

      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError("Incorrect credentials");
      }

      const token = signToken(admin);

      return { token, admin };
    },

    adminCreate: withAuth(async (parent, args, context) => {
      return await Admin.create(args);
    }, adminLevel.OWNER),
  },
};

module.exports = resolvers;
