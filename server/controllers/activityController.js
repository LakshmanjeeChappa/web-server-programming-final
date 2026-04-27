const activityModel = require("../models/activityModel");

async function addActivity(req, res) {
  try {
    const { type, duration, date } = req.body;

    const user_id = req.user.id; 

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

async function getMyActivities(req, res) {
  try {
    const user_id = req.user.id;

    const activities = await activityModel.getActivitiesByUser(user_id);

    res.json(activities);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  addActivity,
  getMyActivities
};

async function updateActivity(req, res) {
  try {
    const id = req.params.id;
    const user_id = req.user.id;

    await activityModel.updateActivity(id, user_id, req.body);

    res.json({ message: "Activity updated" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteActivity(req, res) {
  try {
    const id = req.params.id;
    const user_id = req.user.id;

    await activityModel.deleteActivity(id, user_id);

    res.json({ message: "Activity deleted" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function getFriendsActivities(req, res) {
  try {
    const user_id = req.user.id;

    const [rows] = await require("../db/connection").query(
      "SELECT * FROM activities WHERE user_id != ?",
      [user_id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  addActivity,
  getMyActivities,
  updateActivity,
  deleteActivity,
  getFriendsActivities   
};
