import cors from 'cors'
import express from 'express';
import corsOptions from '../middleware/corsOptions.js';
import dotenv from 'dotenv';
import { sendEmail } from '../controllers/emailController.js';

dotenv.config();

const emailRouter = express.Router();

emailRouter.options("*", cors());
emailRouter.use(express.json());

//Send Email 
emailRouter.post("/sendEmail", cors(corsOptions), sendEmail)

  export default emailRouter;