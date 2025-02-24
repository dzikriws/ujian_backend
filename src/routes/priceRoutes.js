const express = require("express");
const router = express.Router();

const { createPriceList } = require("../controllers/priceController");


router.post("/price-list", createPriceList);

module.exports = router;