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
app.set("view engine","ejs");

//Import dotenv package and read PORT number from .env file. 
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT;

//Making public image folder available 
// app.use(express.static('ProductImages'));
app.use('/images', express.static('ProductImages'))

//Available Routes for users
app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/notes", noteRouter);
app.use("/email", emailRouter);
app.use("/api/products", productRouter);

//Routes for Admin
app.use("/api/admin", adminRouter);

//test upload picture
// import uploadFile from './src/middleware/UploadFile.js';
// import isAuthenticated from './src/middleware/Auth.js';
// app.get("/upload", (req,res)=>{
//     res.render("upload");
// })
// app.post("/upload", isAuthenticated, uploadFile.single('avatar'), (req,res)=>{
//     res.send('image uploaded')
// })

app.listen(port, console.log('Server is running at port ', port))