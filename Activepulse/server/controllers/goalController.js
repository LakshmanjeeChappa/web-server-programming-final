const goalModel = require("../models/goalModel");

function validateGoal(body) {
  if (!body.title || !body.target_minutes) return "Goal title and target minutes are required";
  if (Number(body.target_minutes) <= 0) return "Target minutes must be greater than 0";
  return null;
}

async function createGoal(req, res) {
  const error = validateGoal(req.body);
  if (error) return res.status(400).json({ error });
  await goalModel.createGoal({ ...req.body, user_id: req.user.id });
  res.status(201).json({ message: "Goal created" });
}

async function getMyGoals(req, res) {
  const goals = await goalModel.getGoalsByUser(req.user.id);
  res.json(goals);
}

async function updateGoal(req, res) {
  const error = validateGoal(req.body);
  if (error) return res.status(400).json({ error });
  const result = await goalModel.updateGoal(req.params.id, req.user.id, req.body);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Goal not found" });
  res.json({ message: "Goal updated" });
}

async function deleteGoal(req, res) {
  const result = await goalModel.deleteGoal(req.params.id, req.user.id);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Goal not found" });
  res.json({ message: "Goal deleted" });
}

module.exports = { createGoal, getMyGoals, updateGoal, deleteGoal };
