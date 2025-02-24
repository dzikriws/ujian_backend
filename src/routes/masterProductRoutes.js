const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/masterProductControllers");

const { authenticateToken } = require("../middlewares/auth");

router.get("/products", getAllProduct);
router.post("/products", authenticateToken, createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
