import express, { Router } from "express";
import { addReview, getReview } from "../controllers/reviewController";

const router: Router = express.Router();

router.post("/addReview", addReview);
router.get("/getReview", getReview);

export default router;
