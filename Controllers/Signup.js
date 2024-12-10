import bcrypt from "bcrypt";
import validator from "validator";
import SignupModel from "../Models/Signup.js";

//signup controller

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    //check if user already exist

    const userExist = await SignupModel.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "User already exist" });
    }

    //validate the email and password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a valid password",
      });
    }

    //hashing passwordusing bcrypt

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create new user

    const newUser = new SignupModel({
      name,
      email,
      password: hashPassword,
    });

    //save new user to database
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
