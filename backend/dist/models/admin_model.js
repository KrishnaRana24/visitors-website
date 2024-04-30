"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSignupSchema = new mongoose_1.Schema({
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
const Admin = (0, mongoose_1.model)("Admin", adminSignupSchema);
exports.default = Admin;
