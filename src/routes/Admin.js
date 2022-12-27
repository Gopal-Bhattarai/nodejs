import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import corsOptions from "../middleware/corsOptions.js";
import isAuthenticated from "../middleware/Auth.js";
import { isAdmin } from "../middleware/Auth.js";

import dotenv from "dotenv";
dotenv.config();

const adminRouter = express.Router();

adminRouter.options("*", cors());
adminRouter.use(express.json());

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


//Get Loggedin user details on /api/users/getuser, Auth Required.
adminRouter.post("/allUsers", isAuthenticated, isAdmin, cors(corsOptions), async (req, res) => {
  //const { email, password, ...rest } = req.body;
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).send(error.message);
  }
});


export default adminRouter;
