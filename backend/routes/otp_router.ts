import express, { Router } from "express";
import { generateOtp, verifyOtp } from "../controllers/otpEmailController";

const router: Router = express.Router();

router.post("/generateOtp", generateOtp);
router.post("/verifyOtp", verifyOtp);

export default router;
