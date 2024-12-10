import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../Models/Signup.js";

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    //check if user already exist

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exist" });
    }

    //validate the email

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    //password validation

    if (password.length < 8) {
      return res.json({ success: false, message: "Invalid password" });
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
    return res.json({
      success: true,
      message: "User registered succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser };
