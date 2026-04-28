const bcrypt = require("bcrypt");
const db = require("./connection");

async function createTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS exercise_types (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS workouts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      exercise_type_id INT NULL,
      title VARCHAR(100) NOT NULL,
      duration INT NOT NULL,
      calories INT DEFAULT 0,
      workout_date DATE NOT NULL,
      notes VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_type_id) REFERENCES exercise_types(id) ON DELETE SET NULL
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS goals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(100) NOT NULL,
      target_minutes INT NOT NULL,
      status VARCHAR(30) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

async function seedData() {
  const [users] = await db.query("SELECT COUNT(*) AS count FROM users");
  if (users[0].count === 0) {
    const adminHash = await bcrypt.hash("123", 10);
    const johnHash = await bcrypt.hash("123", 10);
    await db.query(
      "INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?), (?, ?, ?, ?)",
      ["Admin User", "admin", adminHash, "admin", "John Runner", "john", johnHash, "user"]
    );
  }

  const [types] = await db.query("SELECT COUNT(*) AS count FROM exercise_types");
  if (types[0].count === 0) {
    await db.query(
      "INSERT INTO exercise_types (name, description) VALUES (?, ?), (?, ?), (?, ?), (?, ?)",
      [
        "Running", "Outdoor or treadmill running",
        "Strength", "Weight training and resistance workouts",
        "Cycling", "Indoor or outdoor cycling",
        "Yoga", "Flexibility and recovery sessions"
      ]
    );
  }
}

async function initDb() {
  await createTables();
  await seedData();
  console.log("Database ready");
}

module.exports = initDb;
