const express = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser, getUsers, getUserById } = require("../controllers/users.controller");

const router = express.Router();

// Mendaftar
router.post("/", [check("email").isEmail().withMessage("Please enter a valid email address.")], registerUser);

// Login
router.post("/login", loginUser);

// Mendapatkan data semua users
router.get("/", getUsers);

// Mendapatkan data user tertentu
router.get("/:userId", getUserById);

module.exports = router;
