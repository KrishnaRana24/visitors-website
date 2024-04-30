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
      meetPersonemail: req.body.meetpersonemail,
      subject: "OTP for meeting Invitation",
      message,
      meetpersonmessage,
    });

    return res.status(200).json({
      status: "success",
      message: `OTP sent successfully to ${visitor?.email}`,
      meetpersonmessage: `message is successfully send to ${req.body.meetpersonemail}`,
    });
  } catch (error) {
    res.status(500).send({ message: "Error sending email:", error });
  }
};

//verify otp and after delete
export const verifyOtp = async (req: Request, res: Response) => {
  const { visitor, otp } = req.body;
  console.log("visitor--", visitor);
  console.log("visitor otp --", otp);

  const storedOTP = await OTP.find({ otp });
  console.log(storedOTP);

  if (!storedOTP) {
    return res.status(400).json({ message: "OTP not found for the visitor" });
  } else {
    res.send({ message: "OTP verification successful" });
  }
  await OTP.deleteOne({ storedOTP });
  return res.json({ message: "successfully deleted!" });
};

// mail to meetPerson
