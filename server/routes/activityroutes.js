const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const activityController = require("../controllers/activityController");

router.post("/", verifyToken, activityController.addActivity);
router.get("/", verifyToken, activityController.getMyActivities);

module.exports = router;

router.put("/:id", verifyToken, activityController.updateActivity);
router.delete("/:id", verifyToken, activityController.deleteActivity);

router.get("/friends", verifyToken, activityController.getFriendsActivities);