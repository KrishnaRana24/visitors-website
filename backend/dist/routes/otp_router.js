"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpEmailController_1 = require("../controllers/otpEmailController");
const demoemail_1 = require("../controllers/demoemail");
// import mailSender from "../utils/sendMail";
const router = express_1.default.Router();
router.post("/generateOtp", otpEmailController_1.generateOtp);
// router.post("/verifyOtp", verifyOtp);
router.post("/otps", demoemail_1.generateOtps);
exports.default = router;
