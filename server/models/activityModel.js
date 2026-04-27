const db = require("../db/connection");

async function createActivity(activity) {
  const { user_id, type, duration, date } = activity;

  const [result] = await db.query(
    "INSERT INTO activities (user_id, type, duration, date) VALUES (?, ?, ?, ?)",
    [user_id, type, duration, date]
  );

  return result;
}

async function getActivitiesByUser(user_id) {
  const [rows] = await db.query(
    "SELECT * FROM activities WHERE user_id = ?",
    [user_id]
  );

  return rows;
}

module.exports = {
  createActivity,
  getActivitiesByUser
};

async function updateActivity(id, user_id, activity) {
  const { type, duration, date } = activity;

  const [result] = await db.query(
    "UPDATE activities SET type=?, duration=?, date=? WHERE id=? AND user_id=?",
    [type, duration, date, id, user_id]
  );

  return result;
}

async function deleteActivity(id, user_id) {
  const [result] = await db.query(
    "DELETE FROM activities WHERE id=? AND user_id=?",
    [id, user_id]
  );

  return result;
}

module.exports = {
  createActivity,
  getActivitiesByUser,
  updateActivity,
  deleteActivity
};