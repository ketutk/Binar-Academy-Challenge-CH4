const express = require("express");
const { createAccount, getAccounts, getMyAccounts, getAccountById } = require("../controllers/accounts.controller");
const { middleware } = require("../middleware/middleware");

const router = express.Router();

// Membuat akun
router.post("/", middleware, createAccount);

// Mendapatkan data semua akun dari semua user
router.get("/", getAccounts);

// Mendapatkan hanya data akun milik user yang login
router.get("/my", middleware, getMyAccounts);

// Menampilkan satu akun tertentu
router.get("/:accountId", getAccountById);

module.exports = router;
