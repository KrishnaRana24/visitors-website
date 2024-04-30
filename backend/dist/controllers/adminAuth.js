"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.adminLogin = exports.adminUpdate = exports.adminSign = exports.getAdmin = exports.uploadImage = void 0;
const admin_model_1 = __importDefault(require("../models/admin_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Token = (id) => {
    let secretOrPrivateKey = process.env.JWT_SECRET || "fallbackSecretKey";
    return jsonwebtoken_1.default.sign({ id }, secretOrPrivateKey, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });
};
const createSendToken = (admin, statusCode, res) => {
    const token = Token(admin.id);
    const cookieOptions = {
        expires: new Date(Date.now() +
            parseFloat(process.env.JWT_COOKIE_EXPIRES_IN) * 60 * 60 * 1000),
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
const multerStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // const uploadDir = path.join(__dirname, "public", "images");
        cb(null, "/home/dev/blockchain/visitor-web/frontend/public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
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
exports.uploadImage = upload.single("photo");
// export const uploadImage = () => {
//   try {
//     //console.log(multerFilter);
//     upload.single("photo");
//     console.log("photo upload successfully");
//   } catch (error) {
//     console.log("photo is not uploaded");
//   }
// };
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    try {
        data = yield admin_model_1.default.find();
    }
    catch (error) {
        console.log(error);
    }
    if (!data) {
        return res.status(400).json({ message: "no admin data found!!" });
    }
    return res.status(200).json({ data });
});
exports.getAdmin = getAdmin;
const adminSign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("fsdg");
        const admin = new admin_model_1.default(req.body);
        console.log(req.body);
        if (req.file) {
            res.status(400).json({ message: "photo is not uploaded!!" });
        }
        const create = yield admin.save();
        console.log(create);
        res.status(201).json({ create });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.adminSign = adminSign;
const adminUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    // const { title } = req.params;
    const adminId = req.params.id;
    console.log(adminId);
    let admin;
    try {
        admin = yield admin_model_1.default.findByIdAndUpdate(adminId, {
            name,
            email,
        });
    }
    catch (error) {
        console.log(error);
    }
    if (!admin) {
        return res.status(500).json({ message: "unable to update admin data" });
    }
    return res.status(200).json({ admin });
});
exports.adminUpdate = adminUpdate;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res
                .status(400)
                .json({ message: "please provide valid email & password" });
        }
        const admininfo = yield admin_model_1.default.findOne({ email }).select("+password");
        if (!admininfo) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        const token = Token(admininfo._id);
        res.status(200).json({ token, admininfo });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.adminLogin = adminLogin;
const logOut = (req, res) => {
    res.cookie("jwt", "loggedOut", {
        expires: new Date(Date.now() + 10 * 1000), // expires after 10 seconds
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
    });
};
exports.logOut = logOut;
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
