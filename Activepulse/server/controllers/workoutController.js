const workoutModel = require("../models/workoutModel");

function validateWorkout(body) {
  if (!body.title || !body.duration || !body.workout_date) {
    return "Title, duration, and workout date are required";
  }
  if (Number(body.duration) <= 0) return "Duration must be greater than 0";
  return null;
}

async function createWorkout(req, res) {
  try {
    const error = validateWorkout(req.body);
    if (error) return res.status(400).json({ error });

    await workoutModel.createWorkout({ ...req.body, user_id: req.user.id });
    res.status(201).json({ message: "Workout saved" });
  } catch (error) {
    console.log("CREATE WORKOUT ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getMyWorkouts(req, res) {
  const workouts = await workoutModel.getWorkoutsByUser(req.user.id);
  res.json(workouts);
}

async function updateWorkout(req, res) {
  const error = validateWorkout(req.body);
  if (error) return res.status(400).json({ error });

  const result = await workoutModel.updateWorkout(req.params.id, req.user.id, req.body);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Workout not found" });
  res.json({ message: "Workout updated" });
}

async function deleteWorkout(req, res) {
  const result = await workoutModel.deleteWorkout(req.params.id, req.user.id);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Workout not found" });
  res.json({ message: "Workout deleted" });
}

async function getSummary(req, res) {
  const summary = await workoutModel.getDashboardSummary(req.user.id);
  res.json(summary);
}

module.exports = { createWorkout, getMyWorkouts, updateWorkout, deleteWorkout, getSummary };
