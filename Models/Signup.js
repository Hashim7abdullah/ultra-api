import mongoose from "mongoose";

const SignUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SignupModel = mongoose.model("Signup", SignUpSchema);

export default SignupModel;
