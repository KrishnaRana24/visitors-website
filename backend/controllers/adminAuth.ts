import { Request, Response, NextFunction, RequestHandler } from "express";
import Admin from "../models/admin_model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// const secretKey = "my-ultra-secret-and-ultra-long-secret-prosper";
// const cookieExpires = "72";

interface CustomRequest extends Request {
  admin?: any; // Define the admin property as optional
}

const generateToken = (id: string) => {
  const secretOrPrivateKey = process.env.JWT_SECRET || "fallbackSecretKey";
  return jwt.sign({ id }, secretOrPrivateKey, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
};

// Login API
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email and password." });
    }
    console.log("email---", email);
    console.log("password----", password);

    // Find admin by email and select password field
    const adminInfo = await Admin.findOne({ email }).select("+password");
    // console.log(email, password);

    console.log("admininfo--", adminInfo);
    if (!adminInfo || !(await adminInfo.correctPassword(password))) {
      // If admin not found or password is incorrect
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // If email and password are correct, create and send token
    const token = generateToken(adminInfo._id);
    console.log(token);

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() +
          parseFloat(process.env.JWT_COOKIE_EXPIRES_IN!) * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res
      .status(200)
      .json({ message: "Successfully logged in.", adminInfo, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res
      .status(401)
      .json({ message: "Token is required or you're not logged in" });
  }

  const token = bearerToken.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    // Check if token belongs to an admin
    const currentAdmin = await Admin.findById(decoded.id);
    if (!currentAdmin) {
      return res.status(401).json({
        message: "Unauthorized. This token does not belong to an admin",
      });
    }

    // Store admin information in the request object for further use
    req.admin = currentAdmin;
    next();
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
    const { name, email, phone, password, rpassword, photo } = req.body;
    // if (password !== rpassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }

    const trimmedPassword = password.trim();
    const trimmedRPassword = rpassword.trim();

    if (trimmedPassword !== trimmedRPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    console.log("trimmedPassword--", trimmedPassword);
    console.log("trimmedRPassword--", trimmedRPassword);

    const hashPwd = bcrypt.hashSync(trimmedPassword);

    console.log("Hash Pwd--", hashPwd);

    const admin = new Admin({
      name,
      email,
      phone,
      password: hashPwd,
      photo,
    });
    // console.log(req.body);
    const create = await admin.save();

    console.log("Admin Data----", create);

    res.status(201).json({ create });
  } catch (error) {
    res.status(500).json({ error });
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
