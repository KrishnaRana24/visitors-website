"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = exports.sendMail = void 0;
const otp_model_1 = __importDefault(require("../models/otp_model"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const visitors_model_1 = __importDefault(require("../models/visitors_model"));
var transport = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    ignoreTLS: false,
    auth: {
        user: "rana.krishna.dcs24@vnsgu.ac.in",
        pass: "rana@12345",
    },
});
// sending mail
const sendMail = (option) => __awaiter(void 0, void 0, void 0, function* () {
    // Define email options for first email
    const mailOption1 = {
        from: "rana.krishna.dcs24@vnsgu.ac.in",
        to: option.email,
        subject: option.subject,
        text: option.message,
    };
    // Define email options for second email
    const mailOption2 = {
        from: "rana.krishna.dcs24@vnsgu.ac.in",
        to: option.meetpersonemail,
        subject: option.subject,
        text: option.meetpersonmessage,
    };
    // Send first email
    yield transport.sendMail(mailOption1);
    // Send second email
    yield transport.sendMail(mailOption2);
});
exports.sendMail = sendMail;
// generate Otp
const generateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitor = yield visitors_model_1.default.findOne({ email: req.body.email });
        if (!visitor) {
            return res
                .status(404)
                .json({ message: "There is no visitor with this email" });
        }
        const otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const data_name = visitor.name;
        const data_phone = visitor.phone;
        console.log(data_name);
        console.log(data_phone);
        if (!data_name || !data_phone) {
            return res.json({ message: "there is no data " });
        }
        const message = `Your OTP is valid for 5 minutes: ${otp}`;
        const meetpersonmessage = `${data_name} is waiting to meet to you for some talk you can communicate with his/her ${visitor.email} or ${data_phone}`;
        const otpData = new otp_model_1.default({ otp, visitor });
        yield otpData.save();
        yield (0, exports.sendMail)({
            email: visitor === null || visitor === void 0 ? void 0 : visitor.email,
            meetpersonemail: req.body.meetpersonemail,
            subject: "OTP for meeting Invitation",
            message,
            meetpersonmessage,
        });
        return res.status(200).json({
            status: "success",
            message: `OTP sent successfully to ${visitor === null || visitor === void 0 ? void 0 : visitor.email}`,
            meetpersonmessage: `message is successfully send to ${req.body.meetpersonemail}`,
        });
    }
    catch (error) {
        res.status(500).send({ message: "Error sending email:", error });
    }
});
exports.generateOtp = generateOtp;
//verify otp and after delete
// export const verifyOtp = async (req: Request, res: Response) => {
//   const { visitor, otp } = req.body;
//   console.log("visitor--", visitor);
//   console.log("visitor otp --", otp);
//   const storedOTP = await OTP.find({ otp });
//   console.log(storedOTP);
//   if (!storedOTP) {
//     return res.status(400).json({ message: "OTP not found for the visitor" });
//   } else {
//     res.send({ message: "OTP verification successful" });
//   }
//   await OTP.deleteOne({ storedOTP });
//   return res.json({ message: "successfully deleted!" });
// };
// mail to meetPerson
