import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  email: {
    type: "text",
    required: true,
  },
  password: {
    type: "text",
    required: true,
  },
});

const LoginModel = mongoose.model("Login", LoginSchema);

export default LoginModel;
