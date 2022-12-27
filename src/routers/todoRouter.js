import cors from 'cors';
import express from 'express';
import Todo from '../models/todo.js';
import corsOptions from '../middleware/corsOptions.js';

const todoRouter = express.Router();

todoRouter.options("*",cors());
todoRouter.use(express.json());

todoRouter.get('/read', cors(corsOptions), async (req,res)=>{
    await Todo.find({}, (error, todos) => {
      error ? console.log(error.message) : res.send({todos})
    })
  })
  
  //Read single Todo
  todoRouter.get('/read/:id', cors(corsOptions), async (req, res)=>{
    const _id = req.params['id'];
    await Todo.find({_id}, (error,todo) => {
      error ? console.log(error.message) : res.send({todo})
    })
  })
  
  //Delete a Todo by ID
  todoRouter.delete("/delete/:id", cors(corsOptions), async (req, res)=>{
    const _id = req.params['id'];
    Todo.deleteOne({_id}, (error) => {
      console.log('Deleted: ',_id);
      res.status(200).send({Deleted: _id});
    })
  })
  
  //update todo
  todoRouter.patch("/edit", cors(corsOptions), async (req,res)=>{
    const _id = req.body.id;
    const desc = req.body.desc;
    console.log(_id, desc);
    await Todo.updateOne({_id}, {desc}, (err,result)=>{
    res.send(result)
    })
  })
  
  
  //Create new Todo
  todoRouter.post('/create', cors(corsOptions), async (req,res)=>{
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

  export default todoRouter;