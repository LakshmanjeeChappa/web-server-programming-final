const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});


const PORT = process.env.PORT || 5000;

const path = require("path");

// serve frontend
app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const activityRoutes = require("./routes/activityRoutes");

app.use("/api/activities", activityRoutes);
