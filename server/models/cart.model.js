const mongoose = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.SchemaType.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.SchemaType.ObjectId,
      ref: "product",
      default: 1,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("cart", cartSchema);
