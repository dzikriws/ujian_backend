const express = require("express");
const router = express.Router();

const {
  getAllSupplier,
  createSupplier,
  deleteSupplier,
  updateSupplier
} = require("../controllers/supplierController");

router.get("/suppliers", getAllSupplier);
router.post("/suppliers", createSupplier);
router.put("/suppliers/:id", updateSupplier);
router.delete("/suppliers/:id", deleteSupplier);

module.exports = router;
