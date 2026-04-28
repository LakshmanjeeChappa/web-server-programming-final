const db = require("../db/connection");

async function createGoal(goal) {
  const [result] = await db.query(
    "INSERT INTO goals (user_id, title, target_minutes, status) VALUES (?, ?, ?, ?)",
    [goal.user_id, goal.title, goal.target_minutes, goal.status || "active"]
  );
  return result;
}

async function getGoalsByUser(user_id) {
  const [rows] = await db.query("SELECT * FROM goals WHERE user_id=? ORDER BY id DESC", [user_id]);
  return rows;
}

async function updateGoal(id, user_id, goal) {
  const [result] = await db.query(
    "UPDATE goals SET title=?, target_minutes=?, status=? WHERE id=? AND user_id=?",
    [goal.title, goal.target_minutes, goal.status || "active", id, user_id]
  );
  return result;
}

async function deleteGoal(id, user_id) {
  const [result] = await db.query("DELETE FROM goals WHERE id=? AND user_id=?", [id, user_id]);
  return result;
}

module.exports = { createGoal, getGoalsByUser, updateGoal, deleteGoal };
