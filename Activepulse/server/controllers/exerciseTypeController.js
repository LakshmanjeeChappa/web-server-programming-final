const typeModel = require("../models/exerciseTypeModel");

async function createType(req, res) {
  if (!req.body.name) return res.status(400).json({ error: "Type name is required" });
  await typeModel.createType(req.body);
  res.status(201).json({ message: "Exercise type created" });
}

async function getAllTypes(req, res) {
  const types = await typeModel.getAllTypes();
  res.json(types);
}

async function updateType(req, res) {
  if (!req.body.name) return res.status(400).json({ error: "Type name is required" });
  await typeModel.updateType(req.params.id, req.body);
  res.json({ message: "Exercise type updated" });
}

async function deleteType(req, res) {
  await typeModel.deleteType(req.params.id);
  res.json({ message: "Exercise type deleted" });
}

module.exports = { createType, getAllTypes, updateType, deleteType };
