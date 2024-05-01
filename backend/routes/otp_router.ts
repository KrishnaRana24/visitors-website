import express, { Router } from "express";
import Otp from "../models/otp_model";
import { generateOtp, verifyOtp } from "../controllers/otpEmailController";
// import mailSender from "../utils/sendMail";

const router: Router = express.Router();

router.post("/generateOtp", generateOtp);
router.post("/verifyOtp", verifyOtp);

export default router;
