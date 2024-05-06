// import express from "express";
import express, { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import {
  adminSign,
  adminLogin,
  getAdmin,
  adminUpdate,
  deleteAdmin,
  verifyToken,
} from "../controllers/adminAuth";
const adminAuth = require("../controllers/adminAuth");

const router: Router = express.Router();

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: function (req: Request, file: any, cb: any) {
    console.log("file name", file);

    const uploadDir = path.join(__dirname, "public", "images");
    // console.log("upload dir---", uploadDir);

    cb(null, "/home/dev/blockchain/visitor-web/frontend/public/images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(null, true);
  },
});

router.post("/adminauth", imageUpload.single("photo"), adminSign);
router.post("/adminlogin", adminLogin);
router.get("/protectedroute", verifyToken);
router.get("/getdata", getAdmin);
router.put("/updateAdmin/:id", adminUpdate);
router.delete("/:id", deleteAdmin);

router.post(
  "/uploadImage",
  imageUpload.single("photo"),
  (req: Request, res: Response) => {
    res.send(req.file);
  },
  (req: Request, res: Response, next: any) => {
    res.status(400).send({ error: "error" });
  }
);

// router.use(adminAuth.protech);

export default router;
