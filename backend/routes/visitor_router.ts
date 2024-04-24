import express, { Router } from "express";
import { visitorSign } from "../controllers/visitorController";

const router: Router = express.Router();

router.post("/visitorSignup", visitorSign);

export default router;
