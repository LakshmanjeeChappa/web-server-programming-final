const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activityController");

// NO AUTH (for submission)
router.post("/", activityController.addActivity);
router.get("/", activityController.getMyActivities);
router.put("/:id", activityController.updateActivity);
router.delete("/:id", activityController.deleteActivity);
router.get("/friends", activityController.getFriendsActivities);

module.exports = router;