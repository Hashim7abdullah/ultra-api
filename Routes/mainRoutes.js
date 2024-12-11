import express from "express";
import { main, checkAuth } from "../Controllers/main.js";
import userAuth from "../Middlewares/userAuth.js";

const mainRouter = express.Router();

mainRouter.get("/main", userAuth, main);
mainRouter.get("/check-auth", userAuth, checkAuth);

export default mainRouter;