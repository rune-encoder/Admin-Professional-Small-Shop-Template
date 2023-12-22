const { Schema, model } = require("mongoose");

const productInCartSchema = require("./productInCartSchema");

const orderSchema = new Schema(
  {
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    products: [productInCartSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
    contactFirstName: {
      type: String,
      required: true,
    },
    contactLastName: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentDetails: {
      type: String,
      required: true,
    },
  },
  {
    // ! Revisit: Virtuals
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//  |===== VIRTUALS =====|
// Virtual Property to get the full name of the contact person
orderSchema.virtual("fullName").get(function () {
  return `${this.contactFirstName} ${this.contactLastName}`;
});

// |===== MIDDLEWARE =====|
// Calculate the total price before saving the order.
orderSchema.pre("save", async function () {
  await this.calculateTotalPrice();
});

// |===== METHODS =====|
// Method to calculate the total price of the order.
orderSchema.methods.calculateTotalPrice = async function () {
  try {
    await this.populate("products.product");
    
    this.totalPrice = this.products
    .reduce(
      (totalPrice, product) =>
      totalPrice + product.product.price * product.quantity,
      0
      )
      .toFixed(2);
      
      return this.totalPrice;
    } catch (error) {
      throw error; 
    }
  };
  
  const Order = model("Order", orderSchema);
  
  module.exports = Order;