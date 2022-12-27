import express from "express";
import cors from "cors";
import corsOptions from "../middleware/corsOptions.js";
import isAuthenticated from "../middleware/Auth.js";
import { createUser, login, getUser, updateUser } from "../controllers/usersController.js";

import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();

userRouter.options("*", cors());
userRouter.use(express.json());

//Create new User on /api/users/signup Sign Up Form, No Auth
userRouter.post("/signup", cors(corsOptions), createUser)

//Get user on /api/users/login or Login form, No Auth
userRouter.post("/login", cors(corsOptions), login);

//Get Loggedin user details on /api/users/getuser, Auth Required.
userRouter.post("/getuser", isAuthenticated, cors(corsOptions), getUser);

//User Profile changed (fullName, password) /api/users/updateuser, Auth Required.
userRouter.put("/updateuser/:id", isAuthenticated, cors(corsOptions), updateUser);

export default userRouter;
