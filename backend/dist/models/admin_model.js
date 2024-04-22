"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSignup = new mongoose_1.default.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: Number,
    require: true,
    minLenth: 10,
    maxLength: 10,
  },
  password: {
    type: String,
    require: true,
    minLength: 7,
  },
  rpassword: {
    type: String,
    require: true,
    minLength: 7,
  },
  photo: {
    type: String,
    require: true,
  },
});
const admin = mongoose_1.default.model("admintbl", adminSignup);
module.exports = admin;
