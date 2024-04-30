"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorSign = void 0;
const visitors_model_1 = __importDefault(require("../models/visitors_model"));
const visitorSign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if visitor already exists
        const existingVisitor = yield visitors_model_1.default.findOne({ email });
        if (existingVisitor) {
            return res.status(400).json({
                success: false,
                message: "Visitor already exists",
            });
        }
        const visitor = new visitors_model_1.default(req.body);
        const create = yield visitor.save();
        console.log(create);
        res.status(201).json({ create });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.visitorSign = visitorSign;
