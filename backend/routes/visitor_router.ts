import express, { Router } from "express";
import {
  filterData,
  getVisitorData,
  getVisitorDataByYear,
  getVisitorDataByYearMonth,
  pagination,
  visitorSign,
} from "../controllers/visitorController";

const router: Router = express.Router();

router.post("/visitorSignup", visitorSign);
router.get("/getVisitorData", getVisitorData);
router.get("/getVisitorDataByYear", getVisitorDataByYear);
router.get("/getVisitorDataByYearMonth", getVisitorDataByYearMonth);
router.post("/filterdata", filterData);
router.get("/pagination", pagination);

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
