const express = require("express");
const router = express.Router();

const {
  createPriceList,
  getAllPriceList,
  deletePriceList,
  updatePriceList,
} = require("../controllers/priceController");

router.post("/price-list", createPriceList);
router.get("/price-list", getAllPriceList);
router.put("/price-list/:id", updatePriceList);
router.delete("/price-list/:id", deletePriceList);

module.exports = router;
