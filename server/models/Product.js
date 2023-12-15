const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  // IMAGE FOR THE PRODUCT 
  image: {
    cloudinaryId: String,
    url: String,
  },

  // IS THE PRODUCT FEATURED (FOR CAROUSEL)
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

//  |===== VIRTUALS =====|
productSchema.virtual("inStock").get(function () {
  return this.quantity > 0;
});

const Product = model("Product", productSchema);

module.exports = Product;
