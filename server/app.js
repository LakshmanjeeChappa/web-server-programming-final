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

// test route
app.get("/api", (req, res) => {
  res.send("API is running");
});

// serve frontend
app.use(express.static(path.join(__dirname, "../client")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// DB + create tables
const db = require("./db/connection");

async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        username VARCHAR(100),
        password VARCHAR(255),
        role VARCHAR(20)
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        type VARCHAR(100),
        duration INT,
        date DATE
      )
    `);

    console.log("Tables created successfully ✅");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

createTables();

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
