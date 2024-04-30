"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visitorController_1 = require("../controllers/visitorController");
const router = express_1.default.Router();
router.post("/visitorSignup", visitorController_1.visitorSign);
exports.default = router;
