import { Request, Response } from "express";
import OTP from "../models/otp_model";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import Visitor from "../models/visitors_model";
import dotenv from "dotenv";

dotenv.config();

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  ignoreTLS: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// sending mail
export const sendMail = async (option: {
  email: any;
  meetPersonemail: any;
  subject: any;
  message: any;
  meetpersonmessage: any;
}) => {
  // Define email options for first email
  const mailOption1 = {
    from: process.env.MAIL_USER,
    to: option.email,
    subject: option.subject,
    html: option.message,
  };

  // Define email options for second email
  const mailOption2 = {
    from: process.env.MAIL_USER,
    to: option.meetPersonemail,
    subject: option.subject,
    html: option.meetpersonmessage,
  };

  // Send first email
  await transport.sendMail(mailOption1);

  // Send second email
  await transport.sendMail(mailOption2);
};

// generate Otp
export const generateOtp = async (req: Request, res: Response) => {
  try {
    const visitor = await Visitor.findOne({ email: req.body.email });
    if (!visitor) {
      return res
        .status(404)
        .json({ message: "There is no visitor with this email" });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpData = new OTP({ otp, visitor });
    await otpData.save();
    console.log("otpData----", otpData);

    const data_name = visitor.name;
    const data_phone = visitor.phone;
    console.log(data_name);
    console.log(data_phone);

    const message = `
      <p style="font-size: 16px; color: #333; line-height: 1.5;">
        Your OTP is valid for 5 minutes: <strong>${otp}</strong>
      </p>
    `;

    const meetpersonmessage = `
      <p style="font-size: 16px; color: #333; line-height: 1.5;">
        ${data_name} is waiting to meet you for some talk. You can communicate with them via email at ${visitor.email} or by phone at ${data_phone}.
      </p>
    `;

    const sendmail = await sendMail({
      email: visitor?.email,
      meetPersonemail: req.body.meetPersonemail,
      subject: "OTP for meeting Invitation",
      message,
      meetpersonmessage,
    });
    console.log("sendmail", sendmail);

    return res.status(200).json({
      status: "success",
      message: `OTP sent successfully to ${visitor?.email}`,
      meetpersonmessage: `message is successfully send to ${req.body.meetPersonemail}`,
    });
  } catch (error) {
    res.status(500).send({ message: "Error sending email:", error });
  }
};

//verify otp and after delete
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log("visitor email--", email);
    console.log("visitor otp --", otp);

    const visitors = await OTP.find({ otp });
    console.log(visitors);
    if (visitors.length === 0) {
      // No visitor found with the provided OTP
      return res.status(400).json({ message: "OTP not found for the visitor" });
    }
    const visitor = visitors[0];
    if (visitor.otp === otp) {
      // OTP is verified, perform the desired action (e.g., grant access)
      return res.status(200).json({ message: "OTP verified successfully." });
    } else {
      // OTP verification failed
      return res.status(400).json({ message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
