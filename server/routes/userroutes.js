const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;

const verifyToken = require("../middleware/authMiddleware");

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});