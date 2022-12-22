import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import User from './src/models/users.js'

dotenv.config()

const app = express();
const port = process.env.PORT;

// app.use(express.json());
app.use(bodyParser.json());

(async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  })();

app.get('/', (req,res)=>{
    res.send('welcome')
})

app.post("/api/users", async (req,res)=>{
  console.log(req.body);
  const {fullName, email, password, ...rest } = req.body;

  try 
  {
    const user = await User.create({ fullName, email, password, ...rest});
    console.log(user);
    res.send({ status: "User created!", user})
  } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).send(error.message)
    }
});

app.post('/create', (req,res)=>{
    console.log(req.body);
    res.send(req.body)
})

app.listen(port, console.log('Server is running at port ', port))