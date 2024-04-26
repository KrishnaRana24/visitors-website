import { Request, Response } from "express";
import Admin from "../models/admin_model";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

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

const multerStorage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    // const uploadDir = path.join(__dirname, "public", "images");
    cb(null, "/home/dev/blockchain/visitor-web/frontend/public/images/");
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const multerFilter = (req: Request, file: any, callback: any) => {
  if (file.mimetype.startsWith("images")) {
    callback(null, true);
  } else {
    callback(new Error("Not an image. Please upload only images"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    // console.log(fileFilter);

    cb(null, true);
  },
});

export const uploadImage = upload.single("photo");

// export const uploadImage = () => {
//   try {
//     //console.log(multerFilter);

//     upload.single("photo");
//     console.log("photo upload successfully");
//   } catch (error) {
//     console.log("photo is not uploaded");
//   }
// };

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

export const adminSign = async (req: Request, res: Response) => {
  try {
    // console.log("fsdg");

    const admin = new Admin(req.body);
    // console.log(req.body);

    if (req.file) {
      res.status(400).json({ message: "photo is not uploaded!!" });
    }

    const create = await admin.save();
    console.log(create);

    res.status(201).json({ create });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

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

// export const protech = async (req: Request, res: Response, next: any) => {
//   try {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     } else if (req.cookies.jwt && req.cookies.jwt !== "loggedOut") {
//       token = req.cookies.jwt;
//     }
//     if (!token) {
//       return res
//         .status(400)
//         .json({ message: "you are not login please login to get an access" });
//     }
//     //2.)verify token
//     const decode = jwt.verify(token, process.env.JWT_SECRET!);

//     if (typeof decode === "string") {
//       throw new Error("Invalid token");
//     }
//     const currentAdmin = await Admin.findById(decode.id);
//     if (!currentAdmin) {
//       return res
//         .status(400)
//         .json({ message: "this token is not valid to belong admin" });
//     }
//     //req.admin = currentAdmin;
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized please login to get an access" });
//   }
// };
