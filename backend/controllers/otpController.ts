// import { Request, Response } from "express";
// import Visitor from "../models/visitors_model"; // Import your Visitor model

// import nodemailer, { Transporter } from "nodemailer";

// // Create a Nodemailer transporter
// const transporter: Transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST as string,
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: process.env.MAIL_USER as string,
//     pass: process.env.MAIL_PASS as string,
//   },
// });

// // Define the interface for the email options
// interface EmailOptions {
//   email: string;
//   subject: string;
//   message: string;
// }

// // Function to send OTP to a registered visitor
// export const sendOTPToVisitor = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     // Retrieve the visitor's email from the database based on some condition (e.g., visitor ID)
//     const visitorId: string = req.params.id; // Assuming you're passing the visitor ID in the URL
//     const visitor = await Visitor.findById(visitorId);

//     if (!visitor) {
//       res.status(404).json({ message: "Visitor not found" });
//       return;
//     }

//     // Compose the email content
//     const emailOptions: EmailOptions = {
//       email: visitor.email, // Use the visitor's email address
//       subject: "Your OTP", // Customize the subject
//       message: `Dear ${visitor.name},\nYour OTP is: 123456`, // Customize the message
//     };

//     // Send the email
//     await sendEmail(emailOptions);

//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: "Error sending email", error });
//   }
// };

// // Function to send email using Nodemailer
// const sendEmail = async (options: EmailOptions): Promise<void> => {
//   try {
//     const mailOptions = {
//       from: process.env.MAIL_USER as string,
//       to: options.email,
//       subject: options.subject,
//       text: options.message,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully to:", options.email);
//   } catch (error) {
//     throw new Error("Error sending email: " + error);
//   }
// };

import { Request, Response } from "express";
import Otp from "../models/otp_model";
import Visitor from "../models/visitors_model";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

interface EmailOption {
  email: string;
  subject: string;
  message: string;
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "rana.krishna.dcs24@vnsgu.ac.in",
    pass: "rana@12345",
  },
});

export const sendOTP = async (option: EmailOption) => {
  try {
    // const visitorId = req.params.id; // Assuming you're passing the visitor ID in the URL
    // const visitor = await Visitor.findById(visitorId);
    const mailOption = {
      from: "rana.krishna.dcs24@vnsgu.ac.in",
      to: option.email,
      subject: option.subject,
      text: option.message,
    };
    if (!option.email || option.email.trim() === "") {
      console.log("Recipient email address is missing or empty.");
      return;
    }
    console.log(mailOption);
    console.log("Sending mail with options:", mailOption);
    const info = await transporter.sendMail(mailOption);
    console.log("email send successfully", info);
  } catch (error) {
    console.log("error into sending mail", error);
  }
};

//generate Otp
export const generateOtp = async (req: Request, res: Response) => {
  try {
    const visitor = await Visitor.findOne({ email: req.body.email });
    console.log(visitor);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //   const resetURL = `${req.protocol}://${req.get("host")}`;
    const message = `your otp is vaild for 5 min ${otp} `;
    const otpData = new Otp({ otp, visitor });
    await otpData.save();

    await sendOTP({
      email: visitor.email,
      subject: "Your OTP",
      message,
    });

    return res.status(200).json({
      status: "success",
      message: "OTP generated and sent successfully",
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  // const { visitors } = req.body;
  // const otpData = new Otp({ otp, visitors });
  // await otpData.save();
  // try {
  //   res.json({ message: `OTP generated successfully ${visitors} : ${otp}` });
  //   await sendOTP({
  //     email: visitors.email,
  //     subject: `your otp is vaild for 5 min OTP : ${otp}`,
  //     message,
  //   });
  //   return res
  //     .status(200)
  //     .json({ status: "success", message: "token send to the email" });
  // } catch (error) {
  //   res.json({ message: "Error sending email:", error });
  // }
};

//verify otp and after delete
export const verifyOtp = async (req: Request, res: Response) => {
  const { visitors, otp } = req.body;
  const storedOTP = await Otp.findOne({ visitors, otp });
  if (!storedOTP) {
    return res.status(400).json({ message: "OTP not found for the user" });
  } else {
    res.send({ message: "OTP verification successful" });
  }
  await Otp.deleteOne({ _id: storedOTP._id });
  return res.json({ message: "successful delete!" });
};

// export const sendOTP = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     // Check if user is already present
//     const checkVisitorPresent = await Visitor.findOne({ email });
//     // If user found with provided email
//     if (checkVisitorPresent) {
//       return res.status(401).json({
//         success: false,
//         message: "Visitor is already registered",
//       });
//     }
//     let otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });
//     let result = await Otp.findOne({ otp: otp });
//     while (result) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//       });
//       result = await Otp.findOne({ otp: otp });
//     }
//     const otpPayload = { email, otp };
//     const otpBody = await Otp.create(otpPayload);
//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       otp,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, error: error });
//   }
// };
