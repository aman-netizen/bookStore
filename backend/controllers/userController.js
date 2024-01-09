import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// conroller for registering the new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(200).json({
      message: "Email already exists please login",
      success: false,
    });
  }
  
  // hashing the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({
      message: "User Created Successfully",
      success: true,
    });
  } else {
    return res.status(500).json({
      message: "Failed to create User",
      success: false,
    });
  }
};


// controller for login the user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    
    // comparing the stored password and entered password and setting token
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(201).json({
        name: userExist.name,
        token: token,
        message: "Login Successfull",
        success: true,
      });
    } else {
      return res.status(201).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};


// controller for getting particular user based on the token stored in application
export const getUser = async (req, res) => {
  try {
      const user = await User.findOne({ _id: req.user._id });
      user.password = undefined;
    if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      } else {
        return res.status(200).send({
          success: true,
          data: user.name,
          message: "User details successfully fetched",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error in getting user Info", success: false, error });
    }
};
