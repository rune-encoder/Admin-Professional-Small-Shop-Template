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
    categories: withAuth(async (parent, args, context) => {
      return await Category.find();
    }),

    product: withAuth(async (parent, { _id }, context) => {
      return await Product.findById(_id).populate("category");
    }),

    products: withAuth(async (parent, { category, name }, context) => {
      const query = {};

      if (category) {
        query.category = category;
      }

      if (name) {
        query.name = {
          $regex: name,
        };
      }

      return await Product.find(query).populate("category");
    }),

    // ! Search for order based on status of order filter
    order: withAuth(async (parent, { _id }, context) => {
      return await Order.findById(_id).populate("products.product");
    }, adminLevel.MANAGER),

    orders: withAuth(async (parent, { filters }, context) => {
      const query = {};

  for (let key in filters) {
    // Checks the filters object. If the key is falsy, it will skip the key and move on to the next key in the object.
    if (filters[key]) {
      // If the key is "products", it will loop through the array of products and add each product to the query object.
      if (key === 'products') {
        filters[key].forEach(item => {
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
      console.log(query)

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
  },
};

module.exports = resolvers;
