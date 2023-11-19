const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    salePrice: {
      type: Number,
      default: 0.0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    images: [{
      type: String,
      required: true,
    }],
    stock: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
