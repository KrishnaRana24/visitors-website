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

// Connect to MongoDB
mongoose
  .connect(mongodb_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.error("MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 8001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/adminRouter", adminRoute, (req: Request, res: Response, err: any) => {
  res.status(500).json({ message: "invalid Url", err });
});

app.use(
  "/visitorRouter",
  visitorRouter,
  (req: Request, res: Response, err: any) => {
    res.status(500).json({ message: "invalid Url", err });
  }
);

app.use("/otpRouter", otpRouter, (req: Request, res: Response, err: any) => {
  res.status(500).json({ message: "invalid Url", err });
});

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
