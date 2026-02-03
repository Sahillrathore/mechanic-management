import mongoose from "mongoose";

const historySchema = new mongoose.Schema({

    action: String, // ISSUE / RETURN / CREATE_TOOL / CREATE_MECHANIC

    tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool"
    },

    mechanic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    qty: Number,

    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

export default mongoose.model("History", historySchema);
