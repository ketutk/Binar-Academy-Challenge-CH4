const express = require("express");
const { middleware } = require("../middleware/middleware");
const { addTransaction, getTransactions, getTransactionById, getMyTransactions } = require("../controllers/transactions.controller");

const router = express.Router();

// Melakukan transaksi
router.post("/", middleware, addTransaction);

// Mendapat semua data transaksi
router.get("/", getTransactions);

// Mendapat semua data transaksi pribadi yang disertakan akun penerima serta pengirim disertakan user
router.get("/my", middleware, getMyTransactions);

// Mendapat satu data transaksi pribadi yang disertakan akun penerima serta pengirim disertakan user
router.get("/:transactionId", getTransactionById);

module.exports = router;
