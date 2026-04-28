const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const initDb = require("./db/initDb");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseTypeRoutes = require("./routes/exerciseTypeRoutes");
const goalRoutes = require("./routes/goalRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercise-types", exerciseTypeRoutes);
app.use("/api/goals", goalRoutes);

app.get("/api", (req, res) => res.json({ message: "ActivePulse API is running" }));

app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  }
});

const PORT = process.env.PORT || 5000;

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Database startup failed", error);
    process.exit(1);
  });
