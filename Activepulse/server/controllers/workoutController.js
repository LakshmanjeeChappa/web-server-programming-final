const workoutModel = require("../models/workoutModel");

function validateWorkout(body) {
  if (!body.title || !body.duration || !body.workout_date) {
    return "Title, duration, and workout date are required";
  }

  if (Number(body.duration) <= 0) {
    return "Duration must be greater than 0";
  }

  return null;
}

async function createWorkout(req, res) {
  try {
    const error = validateWorkout(req.body);
    if (error) return res.status(400).json({ error });

    await workoutModel.createWorkout({
      ...req.body,
      user_id: req.user.id
    });

    res.status(201).json({ message: "Workout saved" });

  } catch (error) {
    console.log("CREATE WORKOUT ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getMyWorkouts(req, res) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 20);
    const offset = (page - 1) * limit;

    const result = await workoutModel.getWorkoutsByUserPaged(
      req.user.id,
      limit,
      offset
    );

    res.json({
      workouts: result.workouts,
      total: result.total,
      page,
      limit
    });

  } catch (error) {
    console.log("GET WORKOUTS ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function updateWorkout(req, res) {
  try {
    const error = validateWorkout(req.body);
    if (error) return res.status(400).json({ error });

    const result = await workoutModel.updateWorkout(
      req.params.id,
      req.user.id,
      req.body
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json({ message: "Workout updated" });

  } catch (error) {
    console.log("UPDATE WORKOUT ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteWorkout(req, res) {
  try {
    const result = await workoutModel.deleteWorkout(
      req.params.id,
      req.user.id
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json({ message: "Workout deleted" });

  } catch (error) {
    console.log("DELETE WORKOUT ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getSummary(req, res) {
  try {
    const summary = await workoutModel.getDashboardSummary(req.user.id);
    res.json(summary);

  } catch (error) {
    console.log("SUMMARY ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  getSummary
};