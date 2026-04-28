const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");

app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);

// API test route
app.get("/api", (req, res) => {
  res.send("API is running");
});

// serve frontend (static files)
app.use(express.static(path.join(__dirname, "../client")));

// ✅ FIXED fallback (does NOT break JS files)
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api") && !req.path.includes(".")) {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  }
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});