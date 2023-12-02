const { Schema, model } = require("mongoose");

const productInCartSchema = require("./productInCartSchema");

const guestSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    sessionID: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // 24 hours
    },
    cart: [productInCartSchema],
  }
  //   {
  //     timestamps: true,
  //     expireAfterSeconds: 24 * 60 * 60,
  //   }
);

guestSchema.virtual("cartCount").get(function () {
    // Calculate the total count by summing up the quantities of all products
    return this.cart.reduce((totalCount, product) => totalCount + product.quantity, 0);
  });

const Guest = model("Guest", guestSchema);

module.exports = Guest;
