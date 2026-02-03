import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import mechanicRoutes from "./routes/mechanic.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mechanic", mechanicRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log("Server running on port ", PORT));
})
.catch(err => console.error(err));
