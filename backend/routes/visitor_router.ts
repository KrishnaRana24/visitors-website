import express, { Router } from "express";
import { getVisitorData, visitorSign } from "../controllers/visitorController";

const router: Router = express.Router();

router.post("/visitorSignup", visitorSign);
router.get("/getVisitorData", getVisitorData);

export default router;
// export const getVisitorData = async (req: Request, res: Response) => {
//     let data;
//     try {
//       data = await Visitor.find();
//     } catch (error) {
//       console.error("error to dispaly visitor data", error);
//     }
//     if (!data) {
//       return res.status(400).json({ message: "no visitor data found!!" });
//     }
//     return res.status(200).json({ data });
//   };
