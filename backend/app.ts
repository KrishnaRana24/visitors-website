import express, { Request, Response } from "express";
import mongoose from "mongoose";
import adminRoute from "./routes/admin_router";
import visitorRouter from "./routes/visitor_router";
import otpRouter from "./routes/otp_router";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection URI
const mongodb_url = "mongodb://127.0.0.1:27017/visitorVaultdb";

const app = express();
const port = process.env.PORT || 8000;
// Connect to MongoDB
mongoose
  .connect(mongodb_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(cors());
app.use(adminRoute);
app.use(visitorRouter);
app.use(otpRouter);

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
