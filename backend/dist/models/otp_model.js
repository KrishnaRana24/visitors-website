"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.Schema({
    otp: String,
    // timestamp: { type: Date, default: Date.now },
    visitors: { type: mongoose_1.Schema.Types.ObjectId, ref: "visitor" },
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
const Otp = (0, mongoose_1.model)("Otp", OtpSchema);
exports.default = Otp;
