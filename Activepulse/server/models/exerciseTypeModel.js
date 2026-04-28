const db = require("../db/connection");

async function createType(type) {
  const [result] = await db.query(
    "INSERT INTO exercise_types (name, description) VALUES (?, ?)",
    [type.name, type.description || null]
  );
  return result;
}

async function getAllTypes() {
  const [rows] = await db.query("SELECT * FROM exercise_types ORDER BY name");
  return rows;
}

async function updateType(id, type) {
  const [result] = await db.query(
    "UPDATE exercise_types SET name=?, description=? WHERE id=?",
    [type.name, type.description || null, id]
  );
  return result;
}

async function deleteType(id) {
  const [result] = await db.query("DELETE FROM exercise_types WHERE id=?", [id]);
  return result;
}

module.exports = { createType, getAllTypes, updateType, deleteType };
