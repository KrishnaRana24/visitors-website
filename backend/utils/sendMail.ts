import nodemailer from "nodemailer";

export const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<nodemailer.SentMessageInfo> => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST as string,
      secure: false,
      auth: {
        user: process.env.MAIL_USER as string,
        pass: process.env.MAIL_PASS as string,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER as string,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error);
  }
};

export default mailSender;
