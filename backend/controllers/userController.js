import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// ================= CREATE TOKEN =================

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ================= LOGIN USER =================

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      role: user.role,
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================= REGISTER USER =================

const registerUser = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    // CHECK EXISTING USER

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // VALID EMAIL

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email",
      });
    }

    // VALID PASSWORD

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // HASH PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // CREATE USER

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // TOKEN

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      role: user.role,
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser };