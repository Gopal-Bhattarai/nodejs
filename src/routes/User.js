import express from 'express';
import cors from 'cors';
import User from '../models/users.js'
import corsOptions from './corsOptions.js';

const userRouter = express.Router();

userRouter.options('*',cors());
userRouter.use(express.json());

//Create new User on /api/users/create
userRouter.post("/create", cors(corsOptions), async (req,res)=>{
    console.log(req.body);
    const {fullName, email, password, ...rest } = req.body;
  
    try 
    {
      const user = await User.create({ fullName, email, password, ...rest});
      console.log(user);
      res.status(200).send({ status: "User created!", user})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(400).send(error.message)
      }
  });

export default userRouter;
  