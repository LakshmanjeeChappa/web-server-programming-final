const db = require("../db/connection");

async function createWorkout(workout) {
  const { user_id, exercise_type_id, title, duration, calories, workout_date, notes } = workout;

  const [result] = await db.query(
    `INSERT INTO workouts 
    (user_id, exercise_type_id, title, duration, calories, workout_date, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, exercise_type_id || null, title, duration, calories || 0, workout_date, notes || null]
  );

  return result;
}

async function getWorkoutsByUser(user_id) {
  const [rows] = await db.query(
    `SELECT w.*, et.name AS exercise_type
     FROM workouts w
     LEFT JOIN exercise_types et ON w.exercise_type_id = et.id
     WHERE w.user_id = ?
     ORDER BY w.workout_date DESC, w.id DESC`,
    [user_id]
  );

  return rows;
}

async function getWorkoutsByUserPaged(user_id, limit, offset) {
  const [rows] = await db.query(
    `SELECT w.*, et.name AS exercise_type
     FROM workouts w
     LEFT JOIN exercise_types et ON w.exercise_type_id = et.id
     WHERE w.user_id = ?
     ORDER BY w.workout_date DESC, w.id DESC
     LIMIT ? OFFSET ?`,
    [user_id, limit, offset]
  );

  const [countRows] = await db.query(
    "SELECT COUNT(*) AS total FROM workouts WHERE user_id = ?",
    [user_id]
  );

  return {
    workouts: rows,
    total: countRows[0].total
  };
}

async function updateWorkout(id, user_id, workout) {
  const { exercise_type_id, title, duration, calories, workout_date, notes } = workout;

  const [result] = await db.query(
    `UPDATE workouts
     SET exercise_type_id = ?, title = ?, duration = ?, calories = ?, workout_date = ?, notes = ?
     WHERE id = ? AND user_id = ?`,
    [exercise_type_id || null, title, duration, calories || 0, workout_date, notes || null, id, user_id]
  );

  return result;
}

async function deleteWorkout(id, user_id) {
  const [result] = await db.query(
    "DELETE FROM workouts WHERE id = ? AND user_id = ?",
    [id, user_id]
  );

  return result;
}

async function getDashboardSummary(user_id) {
  const [rows] = await db.query(
    `SELECT 
      COUNT(*) AS totalWorkouts,
      COALESCE(SUM(duration), 0) AS totalMinutes,
      COALESCE(SUM(calories), 0) AS totalCalories
     FROM workouts
     WHERE user_id = ?`,
    [user_id]
  );

  return rows[0];
}

module.exports = {
  createWorkout,
  getWorkoutsByUser,
  getWorkoutsByUserPaged,
  updateWorkout,
  deleteWorkout,
  getDashboardSummary
};