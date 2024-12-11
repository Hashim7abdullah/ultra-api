import express from 'express'
import { forgotPassword, logedUser, registerUser, resetPassword } from '../Controllers/User.js'

const userRouter = express.Router()

userRouter.post("/sign-in", registerUser)
userRouter.post("/login", logedUser)
userRouter.post("/forgot-password" , forgotPassword)
userRouter.post("/reset-password/:token" , resetPassword)

export default userRouter