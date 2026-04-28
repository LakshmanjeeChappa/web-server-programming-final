const activityModel = require("../models/activityModel");

// ADD
async function addActivity(req, res) {
  try {
    const { type, duration, date } = req.body;

    const user_id = 1;

    await activityModel.createActivity({
      user_id,
      type,
      duration,
      date
    });

    res.json({ message: "Activity added" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

// GET
async function getMyActivities(req, res) {
  try {
    const user_id = 1;

    const activities = await activityModel.getActivitiesByUser(user_id);

    res.json(activities);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// UPDATE
async function updateActivity(req, res) {
  try {
    const id = req.params.id;
    const user_id = 1;

    await activityModel.updateActivity(id, user_id, req.body);

    res.json({ message: "Activity updated" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// DELETE
async function deleteActivity(req, res) {
  try {
    const id = req.params.id;
    const user_id = 1;

    await activityModel.deleteActivity(id, user_id);

    res.json({ message: "Activity deleted" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// FRIENDS
async function getFriendsActivities(req, res) {
  try {
    const user_id = 1;

    const [rows] = await require("../db/connection").query(
      "SELECT * FROM activities WHERE user_id != ?",
      [user_id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ SINGLE EXPORT ONLY
module.exports = {
  addActivity,
  getMyActivities,
  updateActivity,
  deleteActivity,
  getFriendsActivities
};