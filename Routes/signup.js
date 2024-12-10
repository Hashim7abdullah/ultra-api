import express from "express";
import { registerUser } from "../Controllers/Signup.js";

const signupRouter = express.Router();

signupRouter.post("/sign-in", registerUser);

export default signupRouter;
