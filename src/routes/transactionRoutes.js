const express = require("express");
const router = express.Router();

const {
  getAllTransaction,
  createTransaction,
  getTransactionById
} = require("../controllers/transactionController");

router.get("/transactions", getAllTransaction);
router.post("/transactions", createTransaction);
router.get("/transactions/:id", getTransactionById);

module.exports = router;
