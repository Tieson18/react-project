const cartModel = require("../models/cart.model");
const CustomError = require("../utils/error");
const { response } = require("../utils/helper");

const handleAddToCart = async () => {
  try {
    // CHECK FOR EXISTING PRODUCTS
    const prevItem = cartModel.find({
      userId: req.user._id,
      productId: req.body.productId,
    });
    if (!prevItem) {
      if (!req.body.productId) throw new CustomError("Product id is required");
      const cartItem = await cartModel.create({
        productId: req.body.productId,
        userId: req.body.user._id,
      });

      return res.status(201).send(response("Added product to cart", cartItem));
    }

    // IF PRODUCT EXISTS
    const cartItem = cartModel.findByIdAndUpdate(
      prevItem._id,
      {
        ...prevItem.toObject(),
        quantity: prevItem.quantity + 1,
      },
      { new: true }
    );

    res.status(201).send(response("Added product to cart", cartItem));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

module.exports={
    handleAddToCart
}
