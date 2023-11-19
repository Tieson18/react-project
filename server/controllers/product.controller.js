const productModel = require("../models/product.model");
const CustomError = require("../utils/error");
const { response } = require("../utils/helper");

const handleCreateProduct = async (req, res) => {
  try {
    // CHECK IF NAME IS IN THE BODY
    if (!req.body.name) throw new CustomError("Name is required", 400);

    if (!req.body.regularPrice)
      throw new CustomError("regularPrice is required", 400);

    if (!req.body.category) throw new CustomError("category is required", 400);

    if (!req.body.description)
      throw new CustomError("description is required", 400);

    if (!req.body.images) throw new CustomError("image is required", 400);

    // ADD TO DATABASE
    const product = (await productModel.create(req.body)).populate("category");

    res.status(201).send(response("Product added successfully", product));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

const handleGetAllProducts = async (req, res) => {
  try {
    // Get all categories
    const products = await productModel.find().populate("category");
    res.status(200).send(response("All product", products));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    if (!req.params.id) throw new CustomError("ID param required");

    // Check if product exists
    const product = await productModel.findById(req.params.id);
    if (!product) throw new CustomError("Product not found");
    console.log("PRODUCT", product);
    // Delete product
    await product.deleteOne();

    res.status(200).send(response("Product deleted", product));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

const handleUpdateProduct = async (req, res) => {
  try {
    if (!req.params.id) throw new CustomError("ID (param) is required", 400);

    // Check if exists
    const check = await productModel.findById(req.params.id);
    if (!check) throw new CustomError("Category not found", 404);
    // Upadte categories

    const data = {
      // old data
      ...check.toObject(),
      ...req.body,
    };
    const updateProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    res.status(200).send(response("Product Updated ", updateProduct));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

module.exports = {
  handleCreateProduct,
  handleGetAllProducts,
  handleDeleteProduct,
  handleUpdateProduct,
};
