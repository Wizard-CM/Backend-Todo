import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { connectdb } from "./data/dbConnnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

dotenv.config({
  path: "./data/.env",
});

export const app = express();

// Database connecting function
connectdb();

// Setup and middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // since the form data is in json format , express.json middleware is used
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true  // through this property , we can send headers to the frontend , like cookies
}))

// router Configuration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Error Middleware
app.use(errorMiddleware);
