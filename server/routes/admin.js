import express from "express";
import User from "../models/User.js";
import Tool from "../models/Tool.js";
import Issue from "../models/Issue.js";
import History from "../models/History.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();


// ================= MECHANIC CREATE =================

router.post("/mechanic",
    auth(["admin"]),
    upload.single("picture"),
    async (req, res) => {

        const { name, email, mobile, password, level } = req.body;

        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/;
        if (!passRegex.test(password))
            return res.status(400).json({ msg: "Weak password" });

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const existsNum = await User.findOne({ mobile });
        if (existsNum) {
            return res.status(400).json({ msg: "Mobile number already exists" });
        }


        const mechanic = await User.create({
            name,
            email,
            mobile,
            password,
            level,
            role: "mechanic",
            picture: req.file?.path
        });

        await History.create({
            action: "CREATE_MECHANIC",
            mechanic: mechanic._id,
            performedBy: req.user.id
        });

        res.json(mechanic);
    });


// ================= TOOL CREATE =================

router.post("/tool",
    auth(["admin"]),
    upload.single("image"),
    async (req, res) => {

        const { title, category, availableQty } = req.body;

        if (!title || !category || !availableQty)
            return res.status(400).json({ msg: "All fields required" });

        if (!req.file)
            return res.status(400).json({ msg: "Tool image required" });

        if (Number(availableQty) <= 0)
            return res.status(400).json({ msg: "Quantity must be > 0" });

        const tool = await Tool.create({
            title,
            category,
            availableQty,
            image: req.file.path
        });

        res.json(tool);
    });


// ================= ISSUE TOOL =================

router.post("/issue", auth(["admin"]), async (req, res) => {

    const { toolId, mechanicId, qty } = req.body;

    const tool = await Tool.findById(toolId);
    if (tool.availableQty < qty)
        return res.status(400).json({ msg: "Not enough quantity" });

    tool.availableQty -= qty;
    await tool.save();

    const issue = await Issue.create({
        tool: toolId,
        mechanic: mechanicId,
        qtyIssued: qty
    });

    await History.create({
        action: "ISSUE",
        tool: toolId,
        mechanic: mechanicId,
        qty,
        performedBy: req.user.id
    });

    res.json(issue);
});


// ================= REPORT =================

router.get("/report", auth(["admin"]), async (_, res) => {
    const data = await Issue.find()
        .populate("tool")
        .populate("mechanic");

    res.json(data);
});


router.get("/users", auth(["admin"]), async (_, res) => {
    res.json(await User.find({ role: "mechanic" }));
});


router.get("/tools", auth(["admin"]), async (_, res) => {
    res.json(await Tool.find());
});


router.get("/history", auth(["admin"]), async (_, res) => {
    res.json(await History.find().populate("tool mechanic performedBy"));
});

export default router;
