import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

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

app.post('/create', (req,res)=>{
    console.log(req.body);
    res.send(req.body)
})

app.listen(port, console.log('Server is running at port ', port))