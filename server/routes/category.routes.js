const { handleCreateCategory, handleGetAllCategory, handleDeleteCategory, handleUpdateCategory } = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/",handleCreateCategory)

router.get("/", handleGetAllCategory)

router.put("/:id",handleUpdateCategory)

router.delete("/:id", handleDeleteCategory)

// router.route("/:id")
//     .delete(handleDeleteCategory)
//     .put(handleUpdateCategory)

module.exports = router