const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    product: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
      required: true,
    }],
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("oreder.model", order.modelSchema);
