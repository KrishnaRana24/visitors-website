import express, { Router } from "express";
import Otp from "../models/otp_model";
import { generateOtp } from "../controllers/otpEmailController";
import { generateOtps } from "../controllers/demoemail";
// import mailSender from "../utils/sendMail";

const router: Router = express.Router();

router.post("/generateOtp", generateOtp);
// router.post("/verifyOtp", verifyOtp);
router.post("/otps", generateOtps);

export default router;
