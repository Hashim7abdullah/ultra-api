import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouter from "./Routes/signup.js";

//env configuration
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//api endpoints 
app.use("/api/user" , userRouter)


//connsct database
connectDB();

//port connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
