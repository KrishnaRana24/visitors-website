// import express from "express";
import express, { Router } from "express";
import {
  adminSign,
  adminLogin,
  // protech,
  uploadImage,
  getAdmin,
  adminUpdate,
} from "../controllers/adminAuth";
const adminAuth = require("../controllers/adminAuth");

const router: Router = express.Router();

router.post("/adminauth", adminSign);
router.get("/getdata", getAdmin);
router.put("/updateAdmin", adminUpdate);
router.post("/uploadPhoto", uploadImage);
router.post("/adminlogin", adminLogin);
// router.use(adminAuth.protech);

export default router;
