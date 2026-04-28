const db = require("../db/connection");

async function createUser(user) {
  const { name, username, password, role = "user" } = user;
  const [result] = await db.query(
    "INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)",
    [name, username, password, role]
  );
  return result;
}

async function getUserByUsername(username) {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
  return rows[0];
}

async function getAllUsers() {
  const [rows] = await db.query("SELECT id, name, username, role, created_at FROM users ORDER BY id DESC");
  return rows;
}

async function updateUser(id, user) {
  const { name, username, role } = user;
  const [result] = await db.query(
    "UPDATE users SET name=?, username=?, role=? WHERE id=?",
    [name, username, role, id]
  );
  return result;
}

async function deleteUser(id) {
  const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);
  return result;
}

module.exports = { createUser, getUserByUsername, getAllUsers, updateUser, deleteUser };
