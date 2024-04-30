"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const admin_router_1 = __importDefault(require("./routes/admin_router"));
const visitor_router_1 = __importDefault(require("./routes/visitor_router"));
const otp_router_1 = __importDefault(require("./routes/otp_router"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// MongoDB connection URI
const mongodb_url = "mongodb://127.0.0.1:27017/visitorVaultdb";
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
// Connect to MongoDB
mongoose_1.default
    .connect(mongodb_url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(express_1.default.json());
app.use(cors_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(admin_router_1.default);
app.use(visitor_router_1.default);
app.use(otp_router_1.default);
app.listen(port, () => {
    console.log(`App is running on ${port}`);
});
