import { Request, Response } from "express";
import Admin from "../models/admin_model";
import jwt from "jsonwebtoken";

const Token = (id: any) => {
  let secretOrPrivateKey = process.env.JWT_SECRET || "fallbackSecretKey";
  return jwt.sign({ id }, secretOrPrivateKey, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
};

const createSendToken = (
  admin: any,
  statusCode: number,
  res: Response
): void => {
  const token: string = Token(admin.id);
  const cookieOptions: object = {
    expires: new Date(
      Date.now() +
        parseFloat(process.env.JWT_COOKIE_EXPIRES_IN!) * 60 * 60 * 1000
    ),
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: admin,
    },
  });
};

//get admin data
export const getAdmin = async (req: Request, res: Response) => {
  let data;
  try {
    data = await Admin.find();
  } catch (error) {
    console.log(error);
  }
  if (!data) {
    return res.status(400).json({ message: "no admin data found!!" });
  }
  return res.status(200).json({ data });
};

// add admin Api
export const adminSign = async (req: Request, res: Response) => {
  try {
    const admin = new Admin(req.body);
    // console.log(req.body);
    const create = await admin.save();
    console.log("Admin Data----", create);

    res.status(201).json({ create });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//update api
export const adminUpdate = async (req: Request, res: Response) => {
  const { name, email, phone, photo } = req.body;
  const adminId = req.params.id;
  // console.log(adminId);

  let editAdmin;
  try {
    editAdmin = await Admin.findByIdAndUpdate(adminId, {
      name,
      email,
      phone,
      photo,
    });
  } catch (error) {
    console.log(error);
  }
  if (!editAdmin) {
    return res.status(500).json({ message: "unable to update admin data" });
  }
  return res.status(200).json({ editAdmin });
};

//Delete API

export const deleteAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;
  let deleteAdmin;
  try {
    deleteAdmin = await Admin.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
  if (!deleteAdmin) {
    return res.status(404).json({ message: "Unable to delete Admin" });
  }
  return res.status(200).json({ message: "successfully delete Admin Data" });
};

//login API
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(400)
        .json({ message: "please provide valid email & password" });
    }
    const admininfo = await Admin.findOne({ email }).select("+password");
    if (!admininfo) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = Token(admininfo._id);
    res.status(200).json({ token, admininfo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//LogOut API
export const logOut = (req: CustomRequest, res: Response) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 10 * 1000), // expires after 10 seconds
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

interface CustomRequest extends Request {
  admin?: any | string;
}

export const protech = async (req: Request, res: Response, next: any) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt && req.cookies.jwt !== "loggedOut") {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res
        .status(400)
        .json({ message: "you are not login please login to get an access" });
    }
    //2.)verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decode === "string") {
      throw new Error("Invalid token");
    }
    const currentAdmin = await Admin.findById(decode.id);
    if (!currentAdmin) {
      return res
        .status(400)
        .json({ message: "this token is not valid to belong admin" });
    }
    //req.admin = currentAdmin;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized please login to get an access" });
  }
};
