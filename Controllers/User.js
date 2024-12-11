import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../Models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//register user
const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    //check if user already exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }

    //validate the email
    if (!validator.isEmail(email)) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    //password validation
    if (password.length < 8) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    //save user to DB
    const user = await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User registered succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//USER LOGIN

const logedUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //user exist or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      });
    }

    //valid password or not
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Please provide a valid password ",
      });
    }

    //token assigning
    const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.status(200).json({
      success: true,
      message: "Login successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//FORGOT PASSWORD

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not registered" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    //nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_USER, //sender address
        pass: process.env.APP_PASSWORD, //app password from the gmail account
      },
    });

    const mailOptions = {
      from: {
        name: "Ultra",
        address: process.env.APP_USER,
      },
      to: email, // list of receivers
      subject: "Reset password of your account",
      text: `http://localhost:5173/reset-password/${token}`, // plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "error sending message",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Email sent",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { registerUser, logedUser , forgotPassword };
