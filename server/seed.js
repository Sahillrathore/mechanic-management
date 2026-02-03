import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.create({
    name: "admin",
    email: "admin@gmail.com",
    mobile: "9999999999",
    password: "Admin@123",
    role: "admin"
});

console.log("Admin created");
process.exit();
