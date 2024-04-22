import { Schema, model, Document } from "mongoose";

interface AdminSignup extends Document {
  name: string;
  email: string;
  phone: number;
  password: string;
  rpassword: string;
  photo: string;
}

const adminSignupSchema = new Schema<AdminSignup>({
  name: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  rpassword: {
    type: String,
    required: true,
    minLength: 7,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Admin = model<AdminSignup>("Admin", adminSignupSchema);

export default Admin;
