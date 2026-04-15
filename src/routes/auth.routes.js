const express = require("express");
const router = express.Router();
const { login, logout, createAdmin } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/logout", logout);
// router.post("/create-admin", createAdmin);
module.exports = router;
