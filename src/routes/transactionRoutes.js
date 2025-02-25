const express = require("express");
const router = express.Router();

const {
  getAllTransaction,
  createTransaction,
  getTransactionById,
  updateTransaction,
  getTransactionDetail
} = require("../controllers/transactionController");

const upload = require("../config/multer");

router.get("/transactions", getAllTransaction);
router.get("/transaction-detail/:id", getTransactionDetail);
router.get("/transactions/:id", getTransactionById);
router.post("/transactions", upload.single("proof_url"), createTransaction);
router.put("/transactions/:id", updateTransaction);

module.exports = router;
