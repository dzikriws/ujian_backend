const express = require("express");
const router = express.Router();

const {
  createPriceList,
  getAllPriceList,
  deletePriceList,
  updatePriceList,
  getPriceProduct
} = require("../controllers/priceController");

router.post("/price-list", createPriceList);
router.get("/price-list", getAllPriceList);
router.get("/price-list/:product_id/:uom_id", getPriceProduct);
router.put("/price-list/:id", updatePriceList);
router.delete("/price-list/:id", deletePriceList);

module.exports = router;
