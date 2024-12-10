import express from 'express'
import { logedUser, registerUser } from '../Controllers/User.js'

const userRouter = express.Router()

userRouter.post("/sign-in", registerUser)
userRouter.post("/login", logedUser)

export default userRouter