"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const express_1 = __importDefault(require("express"));
const adminAuth_1 = require("../controllers/adminAuth");
const adminAuth = require("../controllers/adminAuth");
const router = express_1.default.Router();
router.post("/adminauth", adminAuth_1.adminSign);
router.get("/getdata", adminAuth_1.getAdmin);
router.put("/updateAdmin", adminAuth_1.adminUpdate);
router.post("/uploadPhoto", adminAuth_1.uploadImage);
router.post("/adminlogin", adminAuth_1.adminLogin);
// router.use(adminAuth.protech);
exports.default = router;
