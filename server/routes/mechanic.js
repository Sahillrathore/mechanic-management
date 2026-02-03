import express from "express";
import Tool from "../models/Tool.js";
import Issue from "../models/Issue.js";
import History from "../models/History.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


// View inventory
router.get("/tools", auth(["mechanic"]), async (_, res) => {
    res.json(await Tool.find());
});


// My issued tools
router.get("/issues", auth(["mechanic"]), async (req, res) => {
    res.json(
        await Issue.find({ mechanic: req.user.id })
            .populate("tool")
    );
});


// Return tool
router.post("/return", auth(["mechanic"]), async (req, res) => {

    const { issueId, qty } = req.body;

    const issue = await Issue.findById(issueId);
    if (!issue) return res.sendStatus(404);

    issue.qtyReturned += qty;

    if (issue.qtyReturned === issue.qtyIssued)
        issue.status = "returned";
    else
        issue.status = "partial";

    await issue.save();

    const tool = await Tool.findById(issue.tool);
    tool.availableQty += qty;
    await tool.save();

    await History.create({
        action: "RETURN",
        tool: issue.tool,
        mechanic: req.user.id,
        qty,
        performedBy: req.user.id
    });

    res.json({ ok: true });
});

export default router;
