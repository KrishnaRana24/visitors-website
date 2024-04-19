// import express from "express";
import express, { Router } from "express";
import {
  adminSign,
  uploadImage,
  adminLogin,
  protech,
} from "../controllers/adminAuth";

const router: Router = express.Router();

router.post("/adminauth", adminSign);
router.post("/uploadfile", uploadImage);
router.post("/adminlogin", adminLogin);
router.use(protech);
export default router;
