const categoryModel = require("../models/category.model");
const CustomError = require("../utils/error");
const { response } = require("../utils/helper");

const handleCreateCategory = async (req, res) => {
  try {
    // CHECK IF NAME IS IN THE BODY
    if (!req.body.name) throw new CustomError("Name is required", 400);

    // ADD TO DATABASE
    const category = await categoryModel.create({ name: req.body.name });
    res.status(201).send(response("Category added successfully", category));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

const handleGetAllCategory = async (req, res) => {
  try {
    // Get all categories
    const categories = await categoryModel.find({}, "-_v").sort({createdAt: "asc" });
    res.status(201).send(response("All Category", categories));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};
const handleDeleteCategory = async (req, res) => {
  try {
    if (!req.params.id) throw new CustomError("ID (param) is required");

    // Check if Exists
    const category = await categoryModel.findById(req.params.id);
    if (!category) throw new CustomError("Category not found");
    // Delete categories
    await category.deleteOne();

    res.status(201).send(response("Category Deleted", category));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};
const handleUpdateCategory = async (req, res) => {
  try {
    if (!req.params.id) throw new CustomError("ID (param) is required");

    // Check if exists
    const check = await categoryModel.findById(req.params.id);
    if (!check) throw new CustomError("Category not found");
    // Upadte categories

    const data = {
      ...check.toObject(),
      ...req.body,
    };
    const updateCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    res.status(201).send(response("Category ", updateCategory));
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};

module.exports = {
  handleCreateCategory,
  handleGetAllCategory,
  handleDeleteCategory,
  handleUpdateCategory,
}; 

// ASSSIGMENTS
// 1.Add controller function for update of category[SERVER]
// 2.Add controller function for Delete of category[SERVER]
// 3.Add page for category in admin dashboard[ADMIN]
// 4.Create routes for category and link it to the appropriate controller function[SERVER]
// 5.Create routes for product page[SERVER]
// 6.Remove other sidebar links below "return to"
