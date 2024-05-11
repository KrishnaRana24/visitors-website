import { Schema, model, Document, Types } from "mongoose";

interface Otp extends Document {
  otp: string;
  timestamp: Date;
  visitors: Types.ObjectId;
  email: string;
  createdAt: Date;
}

const OtpSchema = new Schema<Otp>({
  otp: String,
  // timestamp: { type: Date, default: Date.now },
  visitors: { type: Schema.Types.ObjectId, ref: "visitor" },
  email: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

const Otp = model<Otp>("Otp", OtpSchema);

export default Otp;
