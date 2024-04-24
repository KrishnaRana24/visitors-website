// import express from "express";
import express, { Router } from "express";
import {
  adminSign,
  adminLogin,
  // protech,
  uploadImage,
} from "../controllers/adminAuth";
const adminAuth = require("../controllers/adminAuth");

const router: Router = express.Router();

router.post("/adminauth", uploadImage, adminSign);
// router.post("/uploadfile", uploadImage);
router.post("/adminlogin", adminLogin);
// router.use(adminAuth.protech);

export default router;
