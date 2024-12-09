import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

//env
dotenv.config();


//app
const app = express();

//Database
connectDB();


//Port
app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
