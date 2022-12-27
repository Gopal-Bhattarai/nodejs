import express from "express";
import cors from "cors";
import corsOptions from "../middleware/corsOptions.js";
import isAuthenticated from "../middleware/Auth.js";
import { isAdmin } from "../middleware/Auth.js";
import { getAllUsers, deleteUser, getAllNotes, deleteNote } from "../controllers/adminController.js";

import dotenv from "dotenv";
dotenv.config();

const adminRouter = express.Router();

adminRouter.options("*", cors());
adminRouter.use(express.json());

//Get Loggedin user details on /api/users/getuser, Auth Required.
adminRouter.post("/allUsers", isAuthenticated, isAdmin, cors(corsOptions), getAllUsers);

//Get Loggedin user details on /api/users/getuser, Auth Required.
adminRouter.delete("/deleteUser/:id", isAuthenticated, isAdmin, cors(corsOptions), deleteUser);

//Route to fetch all notes from Admin: Login required
adminRouter.get('/allnotes', isAuthenticated, isAdmin, cors(corsOptions), getAllNotes)

//Route to delete a new note from Admin: Login required
adminRouter.delete('/deletenote/:id', isAuthenticated, isAdmin, cors(corsOptions), deleteNote)



export default adminRouter;
