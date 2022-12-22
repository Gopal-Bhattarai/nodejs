import express from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import User from './src/models/users.js'
import Todo from './src/models/todo.js'
import cors from 'cors'

dotenv.config()

const app = express();
const port = process.env.PORT;

// app.use(express.json());
app.options('*',cors())
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

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



app.post("/api/users", cors(corsOptions), async (req,res)=>{
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

//todo APIs

//List all Todos
app.get('/api/read', cors(corsOptions), async (req,res)=>{
  await Todo.find({}, (error, todos) => {
    error ? console.log(error.message) : res.send({todos})
  })
})

//Read single Todo
app.get('/api/read/:id', cors(corsOptions), async (req, res)=>{
  const _id = req.params['id'];
  await Todo.find({_id}, (error,todo) => {
    error ? console.log(error.message) : res.send({todo})
  })
})

//Delete a Todo by ID
app.delete("/api/delete/:id", cors(corsOptions), async (req, res)=>{
  const _id = req.params['id'];
  Todo.deleteOne({_id}, (error) => {
    console.log('Deleted: ',_id);
    res.status(200).send({Deleted: _id});
  })
})

//update todo
app.patch("/api/edit", cors(corsOptions), async (req,res)=>{
  const _id = req.body.id;
  const desc = req.body.desc;
  console.log(_id, desc);
  await Todo.updateOne({_id}, {desc}, (err,result)=>{
  res.send(result)
  })
})


//Create new Todo
app.post('/api/create', cors(corsOptions), async (req,res)=>{
    console.log(req.body);
    const {desc, completed, ...rest} = req.body;

    try{
      const todo = await Todo.create({ desc, completed, ...rest});
      console.log(todo);
      res.status(200).send({todo});
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).send(error.message)
    }
})

app.listen(port, console.log('Server is running at port ', port))