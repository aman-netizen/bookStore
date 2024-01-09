import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";
import authmiddleware from "../middleware/authmiddleware.js"
const router = express.Router();

// routes related to users 

router.post("/register", registerUser); // route for register new user
router.post("/login", loginUser);   // route for login the user
router.get("/getUser",authmiddleware, getUser); //route for getting single user detail

export default router;
