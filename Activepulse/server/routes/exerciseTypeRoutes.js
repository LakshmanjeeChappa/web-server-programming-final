const express = require("express");
const router = express.Router();
const controller = require("../controllers/exerciseTypeController");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, controller.getAllTypes);
router.post("/", verifyToken, requireAdmin, controller.createType);
router.put("/:id", verifyToken, requireAdmin, controller.updateType);
router.delete("/:id", verifyToken, requireAdmin, controller.deleteType);

module.exports = router;
