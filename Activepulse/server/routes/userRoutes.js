const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", verifyToken, controller.profile);
router.get("/", verifyToken, requireAdmin, controller.getAllUsers);
router.put("/:id", verifyToken, requireAdmin, controller.updateUser);
router.delete("/:id", verifyToken, requireAdmin, controller.deleteUser);

module.exports = router;
