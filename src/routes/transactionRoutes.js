const express = require("express");
const router = express.Router();

const {
  getAllTransaction,
  createTransaction,
  getTransactionById,
  updateTransaction,
} = require("../controllers/transactionController");

const upload = require("../config/multer");

router.get("/transactions", getAllTransaction);
router.post("/transactions", upload.single("proof_url"), createTransaction);
router.get("/transactions/:id", getTransactionById);
router.put("/transactions/:id", updateTransaction);

module.exports = router;
