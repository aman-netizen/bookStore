import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// middleware for checking the user is correct or not based on the token stored in application/frontend

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
        error,
      });
      // throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
      error,
    });;
    // throw new Error("Not authorized, no token");
  }
};

export default authMiddleware;
