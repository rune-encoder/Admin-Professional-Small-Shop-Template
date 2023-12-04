const { Schema, model } = require("mongoose");

const productInCartSchema = require("./productInCartSchema");

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  orderNumber: {
    type: Number,
    required: true,
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
});

// CALCULATE THE TOTAL PRICE WHEN CREATING OR UPDATING THE ORDER
orderSchema.pre("save", function (next) {
  this.totalPrice = this.calculateTotalPrice();
  next();
});

// VIRTUAL PROPERTY TO CALCULATE THE TOTAL PRICE
orderSchema.virtual("calculateTotalPrice").get(function () {
  return this.products.reduce(
    (totalPrice, product) => totalPrice + product.price * product.quantity,
    0
  );
});

// VIRTUAL PROPERTY TO GET THE FULL NAME OF THE CONTACT PERSON
orderSchema.virtual("fullName").get(function () {
  return `${this.contactFirstName} ${this.contactLastName}`;
});

const Order = model("Order", orderSchema);

module.exports = Order;
