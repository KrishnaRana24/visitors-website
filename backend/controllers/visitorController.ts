import { Request, Response } from "express";
import Visitor from "../models/visitors_model";
import Otp from "../models/otp_model";

export const visitorSign = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if visitor already exists
    const existingVisitor = await Visitor.findOne({ email });
    if (existingVisitor) {
      return res.status(400).json({
        success: false,
        message: "Visitor already exists",
      });
    }

    const visitor = new Visitor(req.body);

    const create = await visitor.save();
    console.log(create);

    res.status(201).json({ create });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
