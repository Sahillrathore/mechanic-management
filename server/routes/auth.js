import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// 🔹 Signup (admin can create mechanic — but open signup useful for demo)
router.post("/signup", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


// 🔹 Login
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
    );

    res.json({
        token,
        role: user.role,
        name: user.name
    });
});

export default router;
