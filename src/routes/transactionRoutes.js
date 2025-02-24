const express = require("express");
const router = express.Router();

const {
  getAllTransaction,
  buyProduct,
  getIndividualTransaction,
} = require("../controllers/transactionController");

const { authenticateToken } = require("../middlewares/auth");

router.get("/transactions", getAllTransaction);
router.get("/transactions/:id", authenticateToken, getIndividualTransaction);
router.post("/transactions", authenticateToken, buyProduct);

module.exports = router;
