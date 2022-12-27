import expressAsyncHadler from "express-async-handler"
import User from '../models/users.js'
import jwt from "jsonwebtoken";

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

const createUser = expressAsyncHadler(async (req, res) => {
    const { fullName, email, password, ...rest } = req.body;
    let status = false;
  
    try {
      const user = await User.create({ fullName, email, password, ...rest });
  
      const authtoken = generateToken(user);
      status = true;
      res.status(200).json({status,  authtoken });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).json({status, Error: error.message});
    }
})

const login = expressAsyncHadler(async (req, res) => {
    const { email, password, ...rest } = req.body;
    let status = false;
  
    try {
      const user = await User.findOne({ email });
  
      if(!user) {
        return res.status(403).json({status, Error: 'Invalid Email'})
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) throw err;
        !isMatch ? res.status(401).json({status, Error: 'Invalid Password'}) : void 0;
        if (isMatch) {
          status = true;
          const authtoken = generateToken(user);
          res.status(200).json({status, authtoken });
        }
      });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).json({status, Error: error.message});
    }
  })

const getUser = expressAsyncHadler(async (req, res) => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).send(error.message);
    }
  })

const updateUser = expressAsyncHadler(async (req, res) => {
    try {
      const {fullName, password} = req.body;
      console.log(req.params.id);
      console.log(req.user.id);
      //find a user with same user token to be updated
      const user = await User.findOne({_id: req.params.id, _id: req.user.id});
  
      if(!user) {return res.status(404).send("Not Available")}
  
      if(fullName){user.fullName=fullName};
      if(password){user.password=password};
  
      //update the user
      await user.save();
      res.status(200).send({user})
  } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(403).send(error.message);
  }
  })

export {
    createUser, login, getUser, updateUser
}