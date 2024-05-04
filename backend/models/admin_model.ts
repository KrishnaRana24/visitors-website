import { Schema, model, Document } from "mongoose";
const validator = require("validator");

interface AdminSignup extends Document {
  name: string;
  email: string;
  phone?: number; // Made phone number optional
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
    required: [true, "Please provide your email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"], // Fixed validator usage
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password length must be more or equal than 8"],
    select: false,
  },
  rpassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (this: AdminSignup, el: string): boolean {
        return el === this.password; // Accessing password directly from 'this'
      },
      message: "PasswordConfirm must match with Password",
    },
  },
  photo: {
    type: String,
    required: true,
  },
});

const Admin = model<AdminSignup>("Admin", adminSignupSchema);

export default Admin;
