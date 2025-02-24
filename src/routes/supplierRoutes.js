const express = require("express");
const router = express.Router();

const {
  getAllSupplier,
  createSupplier,
} = require("../controllers/supplierController");

const { authenticateToken } = require("../middlewares/auth");

router.get("/suppliers", getAllSupplier);
router.post("/suppliers", authenticateToken, createSupplier);

module.exports = router;