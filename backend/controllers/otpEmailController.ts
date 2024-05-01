import { Request, Response } from "express";
import OTP from "../models/otp_model";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import Visitor from "../models/visitors_model";

var transport = nodemailer.createTransport({
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
export const sendMail = async (option: {
  email: any;
  meetPersonemail: any;
  subject: any;
  message: any;
  meetpersonmessage: any;
}) => {
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
    to: option.meetPersonemail,
    subject: option.subject,
    text: option.meetpersonmessage,
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

    const data_name = visitor.name;
    const data_phone = visitor.phone;
    console.log(data_name);
    console.log(data_phone);

    if (!data_name || !data_phone) {
      return res.json({ message: "there is no data " });
    }

    const message = `Your OTP is valid for 5 minutes: ${otp}`;
    const meetpersonmessage = `${data_name} is waiting to meet to you for some talk you can communicate with his/her ${visitor.email} or ${data_phone}`;

    const otpData = new OTP({ otp, visitor });
    await otpData.save();
    console.log("otpData----", otpData);

    await sendMail({
      email: visitor?.email,
      meetPersonemail: req.body.meetPersonemail,
      subject: "OTP for meeting Invitation",
      message,
      meetpersonmessage,
    });

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
