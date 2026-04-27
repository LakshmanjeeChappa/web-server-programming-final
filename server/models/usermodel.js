const db = require("../db/connection");

async function createUser(user) {
  const { name, username, password, role } = user;

  const [result] = await db.query(
    "INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)",
    [name, username, password, role]
  );

  return result;
}

async function getUserByUsername(username) {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  return rows[0];
}

async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}

module.exports = {
  createUser,
  getUserByUsername,
  getAllUsers
};