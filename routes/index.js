const express = require("express");
const router = express.Router();
const {
  handleLogin,
  handleRegister,
} = require("../controllers/AuthController");
const {
  login_validator,
  register_validator,
  authenticateToken,
} = require("../middleware/validator");
const {
  handleHistory,
  handleGetHistory,
} = require("../controllers/HistoryController");

router.post("/register", ...register_validator, handleRegister);
router.post("/login", ...login_validator, handleLogin);

router.post("/history", handleHistory);
router.get("/get-history", authenticateToken, handleGetHistory);

module.exports = router;
