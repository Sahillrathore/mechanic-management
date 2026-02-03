import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({

    tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool",
        required: true
    },

    mechanic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    qtyIssued: {
        type: Number,
        required: true
    },

    qtyReturned: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["issued", "partial", "returned"],
        default: "issued"
    }

}, { timestamps: true });

export default mongoose.model("Issue", issueSchema);
