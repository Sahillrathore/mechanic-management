import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    availableQty: {
        type: Number,
        required: true,
        min: 0
    }

}, { timestamps: true });

export default mongoose.model("Tool", toolSchema);
