const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  console.log("LOGIN ERROR:", error);   
  res.status(500).json({ error: error.message || "Server error" });
}
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (error) {
  console.log("LOGIN ERROR:", error);   
  res.status(500).json({ error: error.message || "Server error" });
}
}

module.exports = {
  register,
  login
};

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

module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser
};