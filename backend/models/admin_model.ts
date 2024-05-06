import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

interface AdminSignup extends Document {
  name: string;
  email: string;
  phone?: number;
  password: string;
  rpassword: string;
  photo: string;
  correctPassword(candidatePassword: string): Promise<boolean>;
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
    validate: [validator.isEmail, "Please provide a valid email"],
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
    required: [false, "Please confirm your password"],
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

// Method to compare password
adminSignupSchema.methods.correctPassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = model<AdminSignup>("Admin", adminSignupSchema);

export default Admin;
