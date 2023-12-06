const { Admin, Shop, Category, Product, Order, Guest } = require("../models");

const { signToken } = require("../utils/authentication");
const { checkPermission, adminLevels } = require("../utils/adminPermissions");

const { AuthenticationError } = require("apollo-server-express");

// const { uploadImage, cloudConfig } = require("../utils/imageUploader");
// require("dotenv").config();
// const fs = require("fs");
// const cloudinary = require("cloudinary").v2;
// ! const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

// BEFORE PERFORMING ANY MUTATIONS OR QUERIES, CHECK IF THE ADMIN IS LOGGED IN AND HAS THE REQUIRED PERMISSION
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
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    }),

    order: withAuth(async (parent, { _id }, context) => {
      return await Order.findById(_id).populate("products.product");
    }, adminLevels.MANAGER),

    orders: withAuth(async (parent, args, context) => {
      return await Order.find({})
        .sort({ purchaseDate: -1 })
        .populate("products.product");
    }, adminLevels.MANAGER),
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
