import jwt from "jsonwebtoken"; 
import { user_Model } from "../models/user.model.js";

export const isAuthendicated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "The User Needs To be Logged In First",
    });
  }

  const tokenDecodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user_Model.findById(tokenDecodedData.id);

  next();
};
