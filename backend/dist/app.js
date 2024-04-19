"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const adminRoute = require("../routes/admin_router.ts");
// MongoDB connection URI
const mongodb_url = "mongodb://localhost:27017/visitorVaultdb";
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Connect to MongoDB
mongoose_1.default
    .connect(mongodb_url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(express_1.default.json());
app.use(adminRoute);
app.get("/app", (req, res) => {
    res.send("Hello World!qwer");
});
app.listen(port, () => {
    console.log(`App is running on ${port}`);
});
