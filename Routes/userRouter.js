import express from 'express'
import { forgotPassword, logedUser, registerUser } from '../Controllers/User.js'

const userRouter = express.Router()

userRouter.post("/sign-in", registerUser)
userRouter.post("/login", logedUser)
userRouter.post("/forgot-password" , forgotPassword)

export default userRouter