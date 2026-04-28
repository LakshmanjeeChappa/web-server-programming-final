const express = require("express");
const router = express.Router();
const controller = require("../controllers/goalController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, controller.getMyGoals);
router.post("/", verifyToken, controller.createGoal);
router.put("/:id", verifyToken, controller.updateGoal);
router.delete("/:id", verifyToken, controller.deleteGoal);

module.exports = router;
