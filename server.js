const express = require("express");
const path = require("path");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

/* =======================
   ROUTES
======================= */

// Home route → index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// REGISTER route
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Email and password are required" });
    }

    // 🔹 For now: simple success response
    // (Later you can connect MongoDB here)
    return res.json({ message: "Registered successfully" });
});

// LOGIN route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Email and password are required" });
    }

    // 🔹 For now: always allow login
    return res.json({ message: "Login successful" });
});

// Portfolio page (extra safety)
app.get("/portfolio.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "portfolio.html"));
});

/* =======================
   EXPORT FOR VERCEL
======================= */

// ❌ DO NOT use app.listen()
// ✅ Vercel will handle the server
module.exports = app;
