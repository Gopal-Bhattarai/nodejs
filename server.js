import express from "express";
import {MongoClient, ObjectId} from 'mongodb';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;
const URI = "mongodb://127.0.0.1:27017"

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.options('*',cors())

const conn = MongoClient.connect(URI, { useNewUrlParser: true}, (error,client)=>{
    if(error){
        return console.log('error occured') } 
    else {

        console.log('MongoDB connected');
        const db = client.db('todo');
        
        app.get("/", cors(corsOptions), async (req, res) => {
            const cursor = db.collection('todolist').find({ });
            const allValues = await cursor.toArray();

            res.status(200).send(allValues)
        })

        app.delete("/:id", cors(corsOptions), async (req,res)=> {
            const _id = ObjectId(req.params['id']);
            const result = await db.collection('todolist').findOneAndDelete({ _id: _id })
            result ? res.status(200).json(result) : void 0;
            console.log(result);
        })
        
        app.post("/create", cors(corsOptions), async (req, res)=>{
            const newRecord = req.body;
            console.log(req.body);

            try {
              const insert = await db.collection('todolist').insertOne(newRecord);
              res.status(200).send(insert)        
              console.log(insert);
            } catch (e) {
                console.log(e);
            }
        })
        
        app.listen(port, console.log('Node Server is running at port ', port))
    } 
})


