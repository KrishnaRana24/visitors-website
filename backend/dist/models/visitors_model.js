"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VisitorSignupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
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
    purpose: {
        type: String,
        required: true,
    },
    tomeet: {
        type: String,
        required: true,
    },
    meetPersonEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});
const Visitor = (0, mongoose_1.model)("visitor", VisitorSignupSchema);
exports.default = Visitor;
