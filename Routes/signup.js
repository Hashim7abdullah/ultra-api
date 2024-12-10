import express from 'express'
import { registerUser } from '../Controllers/Signup.js'

const userRouter = express.Router()

userRouter.post("/sign-in", registerUser)

export default userRouter