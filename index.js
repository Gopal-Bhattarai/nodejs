import express from 'express';

//import Routes
import userRouter from './src/routes/User.js'
import todoRouter from './src/routes/Todo.js';
import noteRouter from './src/routes/Note.js';
import emailRouter from './src/routes/emailRoute.js';

//connection to MongoDB written in ./src/DB.js and called underneath 
import connectToMongo from './src/database/DB.js'
connectToMongo();

//creating app as an express server. 
const app = express();

//Import dotenv package and read PORT number from .env file. 
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT;

//Available Routes
app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/notes", noteRouter);
app.use("/email", emailRouter);

app.listen(port, console.log('Server is running at port ', port))