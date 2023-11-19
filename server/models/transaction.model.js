const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    referenceId: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "order",
      required: true,
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction.model", transaction.modelSchema);
