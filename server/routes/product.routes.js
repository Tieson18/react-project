const { ADMIN_ROLE } = require("../config/roles");
const {
  handleCreateProduct,
  handleGetAllProducts,
  handleDeleteProduct,
  handleUpdateProduct,
} = require("../controllers/product.controller");
const authorization = require("../middlewares/authorization.middlewares");

const router = require("express").Router();

router.post("/", authorization(ADMIN_ROLE), handleCreateProduct);

router.get("/", handleGetAllProducts);

router
  .route("/:id")
  .delete(authorization(ADMIN_ROLE), handleDeleteProduct)
  .put(authorization(ADMIN_ROLE), handleUpdateProduct)
  .patch(authorization(ADMIN_ROLE), handleUpdateProduct);

module.exports = router;
