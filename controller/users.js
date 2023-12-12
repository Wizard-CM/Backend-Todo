import { user_Model } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { cookieAdd } from "../utils/features.js";
import jwt from "jsonwebtoken";
import errorHandler from "../middlewares/error.js";


export const register = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;

    //--------------------------Logic If user is already registered------------------------------//
    const user = await user_Model.findOne({ email });

    if (user) {
      return next(new errorHandler("User Already Exists", 400));
    }

    //--------------------------Logic If User Does not Exits------------------------------//

    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a database entry
    const dbUser = await user_Model.create({
      username: username,
      email: email,
      password: passwordHash,
    });

    cookieAdd(dbUser, 201, "Registered SucessFully", res);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await user_Model.findOne({ email: email }).select("+password");

    // If User Chaina bhane ko Logic //

    // if (!user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User Does Not Exists",
    //   });
    // }
    if (!user) {
      return next(new errorHandler("User Does Not Exists", 400));
    }

    // If the User is Registered ,tes pachi ko Logic
    const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password Does Not Match",
    //   });
    // }
    if (!isMatch) {
      return next(new errorHandler("Password Does Not Match", 400));
    }

    cookieAdd(user, 200, `Welcome Back ! ${user.username}`, res);
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, { 
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure:process.env.NODE_ENV === "Development" ? false : true 
    })
    .json({
      success: true,
      user: "You Are Logged Out",
    });
};
export const getMyDetails = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/*
use await with any database operations
use await while working with bcrypt
*/
