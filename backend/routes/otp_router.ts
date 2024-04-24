import express, { Router } from "express";
import Otp from "../models/otp_model";
import { sendOTP } from "../controllers/otpController";
// import mailSender from "../utils/sendMail";

const router: Router = express.Router();

router.post("/generateOtp", sendOTP);
// router.post("/sendmail", mailSender.call);

export default router;
