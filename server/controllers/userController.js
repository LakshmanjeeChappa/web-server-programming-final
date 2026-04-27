async function login(req, res) {
  try {
    const { username, password } = req.body;

    // ✅ DEMO LOGIN (bypass DB)
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

module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser
};