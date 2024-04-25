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
  meetpersonemail: any; // Add meetpersonemail parameter
  subject: any;
  message: any;
  meetpersonmessage: any; // Add meetpersonmessage parameter
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
    to: option.meetpersonemail,
    subject: option.subject,
    text: option.meetpersonmessage,
  };

  // Send first email
  await transport.sendMail(mailOption1);

  // Send second email
  await transport.sendMail(mailOption2);
};

// generate Otp
export const generateOtps = async (req: Request, res: Response) => {
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

    const message = `Your OTP is valid for 5 minutes: ${otp}`;
    const meetpersonmessage = `Your meeting partner's OTP is valid for 5 minutes`;

    const otpData = new OTP({ otp, visitor });
    await otpData.save();

    await sendMail({
      email: visitor?.email,
      meetpersonemail: req.body.meetpersonemail,
      subject: "OTP for your meeting",
      message,
      meetpersonmessage,
    });

    return res.status(200).json({
      status: "success",
      message: `OTP sent successfully to ${visitor?.email} and ${req.body.meetpersonemail}`,
    });
  } catch (error) {
    res.status(500).send({ message: "Error sending email:", error });
  }
};
