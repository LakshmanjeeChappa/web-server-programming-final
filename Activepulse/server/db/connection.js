const mysql = require("mysql2/promise");
require("dotenv").config();

if (!process.env.MYSQL_PUBLIC_URL) {
  console.warn("MYSQL_PUBLIC_URL is missing. Add it in .env locally or Render environment variables.");
}

const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL || "mysql://root:password@localhost:3306/activepulse");

module.exports = pool;
