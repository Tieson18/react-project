const https = require("https");
const CustomError = require("../utils/error");
const cartModel = require("../models/cart.model");
const axios = require("axios").axios();
const { response, generateId } = require("../utils/helper");
const orderModel = require("../models/order.model");
const transactionModel = require("../models/transaction.model");

const handleInitiateCheckout = async () => {
  try {
    if (!req.user)
      throw new CustomError("Not authorized get the fuck out", 401);
    // Get the items from the users cart
    const userCart = await cartModel
      .find({ userId: req.user._id })
      .populate(["productId"]);

    let totalPrice = 0;
    for (const item of userCart) {
      const quantity = item.quantity;
      const price = item.productId.salePrice || item.productId.regularPrice;
      totalPrice += quantity * price;
    }
    const url = "https://apico.paystack/tansaction/initialize";
    const urlData = {
      headers: {
        Authorization: "Bearer" + process.env.PAYSTACK_SECRET,
        "Content-Type": "application/json",
      },
    };
    const transactionRef = generateId("trx_");
    const params = {
      reference: transactionRef,
      email: req.user.email,
      amount: totalPrice * 100,
      callback_url: "https://localhost:5000/api/v1/checkout/confirm/",
    };

    //ORDER
    const order = await orderModel.create({
      amount: totalPrice,
      products: usersCart.map((item) => item._id),
      user: req.user._id,
    });
    // TRANSACTION
    const tansaction = transactionModel.create({
      reference: transactionRef,
      order: order._id,
      user: req.user._id,
      amount: totalPrice,
    });

    const result = await axios.post(url, params, urlData);
    console.log("RESULT:", result.data);
    res.status(201).send(response("Tansaction created", result.data));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

const verifyCheckout = async (req, res) => {
//  CHECK PAYMENT STATS IN PAYSTACK

// CLEAR CART IF PATMENT IS SUCCESSFUL

// REDIRECT REACT PAYMENT [SUCCESS|ERROR] PAGE
}

module.exports = {
  handleInitiateCheckout,
  verifyCheckout,
};
