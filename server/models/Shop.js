const { Schema, model } = require("mongoose");

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  moto: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Guest",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Shop = model("Shop", shopSchema);

module.exports = Shop;
