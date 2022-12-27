import express from 'express';

//import Routes
import userRouter from './src/routers/userRouter.js'
import todoRouter from './src/routers/todoRouter.js';
import noteRouter from './src/routers/noteRouter.js';
import emailRouter from './src/routers/emailRouter.js';
import adminRouter from './src/routers/adminRouter.js';
import productRouter from './src/routers/productRouter.js';

//connection to MongoDB written in ./src/DB.js and called underneath 
import connectToMongo from './src/database/DB.js'
connectToMongo();

//creating app as an express server. 
const app = express();

//Import dotenv package and read PORT number from .env file. 
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT;

//Available Routes for users
app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/notes", noteRouter);
app.use("/email", emailRouter);
app.use("/api/products", productRouter);

//Routes for Admin
app.use("/api/admin", adminRouter);

app.listen(port, console.log('Server is running at port ', port))