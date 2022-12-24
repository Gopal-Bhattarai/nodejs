import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import corsOptions from "./corsOptions.js";
import fetchuser from '../middleware/fetchuser.js'

import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();

userRouter.options("*", cors());
userRouter.use(express.json());

//Token creation process function
const generateToken = (user) => {
  const data = {
    user: {
      id: user.id,
    },
  };
  const authtoken = jwt.sign(data, process.env.JWT_SECRET);
  return authtoken;
};

//Create new User on /api/users/create Sign Up Form, No Auth
userRouter.post("/signup", cors(corsOptions), async (req, res) => {
  const { fullName, email, password, ...rest } = req.body;

  try {
    const user = await User.create({ fullName, email, password, ...rest });

    const authtoken = generateToken(user);
    res.status(200).json({ authtoken });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).send(error.message);
  }
});

//Get user on /api/users/login or Login form, No Auth
userRouter.get("/login", cors(corsOptions), async (req, res) => {
  const { email, password, ...rest } = req.body;

  try {
    const user = await User.findOne({ email });
    user.comparePassword(password, function (err, isMatch) {
      if (err) throw err;
      !isMatch ? res.status(401).send("Invalid Credentials!") : void 0;
      if (isMatch) {
        const authtoken = generateToken(user);
        res.status(200).json({ authtoken });
      }
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).send(error.message);
  }
});

//Get Loggedin user details on /api/users/getuser, Auth Required.
userRouter.post("/getuser", fetchuser, cors(corsOptions), async (req, res) => {
  const { email, password, ...rest } = req.body;

  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password")
    console.log(user);
    res.status(200).send(user)
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).send(error.message);
  }
});

export default userRouter;
