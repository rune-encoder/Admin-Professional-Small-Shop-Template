const { Schema } = require("mongoose");

const productInCartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1,
  },
});

module.exports = productInCartSchema;