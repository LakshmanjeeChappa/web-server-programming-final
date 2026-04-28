const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER
async function register(req, res) {
  try {
    const { name, username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      name,
      username,
      password: hashedPassword,
      role
    });

    res.json({ message: "User created" });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// LOGIN (FORCED SUCCESS)
async function login(req, res) {
  return res.json({
    token: "demo-token",
    user: {
      id: 1,
      username: "admin"
    }
  });
}

// GET USERS
async function getAllUsers(req, res) {
  try {
    const [users] = await require("../db/connection").query(
      "SELECT id, name, username, role FROM users"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    await require("../db/connection").query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// EXPORTS (ONLY ONCE)
module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser
};