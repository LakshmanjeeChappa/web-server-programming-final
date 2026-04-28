const express = require("express");
const router = express.Router();
const controller = require("../controllers/workoutController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/summary", verifyToken, controller.getSummary);
router.get("/", verifyToken, controller.getMyWorkouts);
router.post("/", verifyToken, controller.createWorkout);
router.put("/:id", verifyToken, controller.updateWorkout);
router.delete("/:id", verifyToken, controller.deleteWorkout);

module.exports = router;
