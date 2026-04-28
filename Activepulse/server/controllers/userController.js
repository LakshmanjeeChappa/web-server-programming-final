const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

async function register(req, res) {
  try {
    const { name, username, password, role } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ error: "Name, username, and password are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser({ name, username, password: hashedPassword, role });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "Username already exists" });
    console.log("REGISTER ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.getUserByUsername(username);
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, username: user.username, role: user.role }
    });
  } catch (error) {
    console.log("LOGIN ERROR", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function profile(req, res) {
  res.json({ user: req.user });
}

async function getAllUsers(req, res) {
  const users = await userModel.getAllUsers();
  res.json(users);
}

async function updateUser(req, res) {
  await userModel.updateUser(req.params.id, req.body);
  res.json({ message: "User updated" });
}

async function deleteUser(req, res) {
  if (Number(req.params.id) === req.user.id) {
    return res.status(400).json({ error: "You cannot delete your own account while logged in" });
  }
  await userModel.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
}

module.exports = { register, login, profile, getAllUsers, updateUser, deleteUser };
