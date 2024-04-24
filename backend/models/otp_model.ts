import { Schema, model, Document, Types } from "mongoose";
import mailSender from "../utils/sendMail";

interface Otp extends Document {
  otp: string;
  email: string;
  createdAt: Date;
  visitors: Types.ObjectId;
}

const OtpSchema = new Schema<Otp>({
  otp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  visitors: { type: Schema.Types.ObjectId, ref: "Visitor" },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

const Otp = model<Otp>("Otp", OtpSchema);

export default Otp;
