import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import userRouter from "./Routes/userRouter.js";

//env configuration
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//api endpoints
app.use("/api/user", userRouter);

//connect database
connectDB();

//port connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
