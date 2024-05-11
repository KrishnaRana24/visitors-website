import { Request, Response } from "express";
import Review from "../models/review_model";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// console.log("TEmp--", process.env.MAIL_USER);

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
  subject: any;
  message: any;
}) => {
  // Define email options for first email
  const mailOption = {
    from: process.env.MAIL_USER,
    to: option.email,
    subject: option.subject,
    html: option.message,
  };

  // Send email
  await transport.sendMail(mailOption);
};

// add review Api
export const addReview = async (req: Request, res: Response) => {
  try {
    const { name, email, rating, comment } = req.body;
    console.log(req.body);
    const review = new Review({ name, email, rating, comment });
    console.log("review--", review);

    await review.save();

    const message = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
    <h2 style="font-size: 24px; color: #333; margin-bottom: 20px;">Thank You for Your Review!</h2>
    <p style="font-size: 16px; color: #333; line-height: 1.5;">
      Hello ${name},<br/><br/>
      Thank you for visiting our premises and sharing your review! We truly appreciate your feedback.<br/><br/>
      <strong>Your Rating:</strong> ${rating}<br/>
      <strong>Your Comment:</strong> ${comment}<br/><br/>
      If you have any further questions or concerns, feel free to contact us.<br/><br/>
      Best regards,<br/>
    </p>
  </div>
`;
    // res.status(201).json({ create });
    // console.log("Review Data----", create);
    const sendmail = await sendMail({
      email: review?.email,
      subject: "Greeting",
      message,
    });
    console.log("sendmail", sendmail);

    return res.status(200).json({
      status: "success",
      message,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//get Review data
export const getReview = async (req: Request, res: Response) => {
  let data;
  try {
    data = await Review.find();
  } catch (error) {
    console.log(error);
  }
  if (!data) {
    return res.status(400).json({ message: "no Review data found!!" });
  }
  return res.status(200).json({ data });
};
