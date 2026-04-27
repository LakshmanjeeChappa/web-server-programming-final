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

// LOGIN (DEMO — NO DB)
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (
      (username === "admin" && password === "123") ||
      (username === "john" && password === "123")
    ) {
      const token = jwt.sign(
        { id: username === "admin" ? 1 : 2, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        token,
        user: {
          id: username === "admin" ? 1 : 2,
          username
        }
      });
    }

    return res.status(401).json({ error: "Invalid credentials" });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
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

// EXPORTS (ONLY ONCE — AT BOTTOM)
module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser
};