import express from "express";
// Controllers
import {
  getMyDetails,
  login,
  logout,
  register,
} from "../controller/users.js";

// Custom Middlewares
import { isAuthendicated } from "../middlewares/Auth.js";

// Exporting Router Feature
const router = express.Router();


// GET REQUESTS
router.get("/",(req,res) => {
  res.send("Index Page")
})
router.get("/me",isAuthendicated,getMyDetails)
router.get("/logout",logout)


// POST REQUESTS
router.post("/new", register);
router.post("/login", login);

export default router;
