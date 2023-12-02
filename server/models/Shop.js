const { Schema, model } = require("mongoose");

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
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
