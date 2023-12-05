const { Admin, Shop, Category, Product, Order, Guest } = require("../models");
const { signToken } = require("../utils/authentication");
const { AuthenticationError } = require("apollo-server-express");
// const { uploadImage, cloudConfig } = require("../utils/imageUploader");

// require("dotenv").config();
// const fs = require("fs");
// const cloudinary = require("cloudinary").v2;

// TODO: const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

const resolvers = {
  Query: {
    categories: async (parent, args, context, info) => {
      return await Category.find();
    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    products: async (parent, { category, name }) => {
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
    },

    order: async (parent, { _id }) => {
      return await Order.findById(_id).populate("products.product");
    },

    orders: async () => {
      return await Order.find({}).sort({ purchaseDate: -1 }).populate("products.product");
    }

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
