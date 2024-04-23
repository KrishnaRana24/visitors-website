import { Schema, model, Document } from "mongoose";

interface Otp extends Document {
  otp: String;
  email: string;
  phone: number;
}

const OtpSchema = new Schema<Otp>({
  otp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10,
  },
});

const Admin = model<Otp>("Admin", OtpSchema);

export default Admin;
