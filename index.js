import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import signupRouter from "./Routes/signup.js";

//env
dotenv.config();

//app
const app = express();
app.use(cors());
app.use(express.json());

//api endpoints
app.use("/api/user",signupRouter)

//Database
connectDB();

//Port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
