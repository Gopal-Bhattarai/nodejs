import express from "express";
import cors from "cors";
import corsOptions from "../middleware/corsOptions.js";
import isAuthenticated from "../middleware/Auth.js";
import { createUser, login, getUser, updateUser, uploadAvatar } from "../controllers/usersController.js";
import uploadFile from "../middleware/UploadFile.js";
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();

userRouter.options("*", cors());
userRouter.use(express.json({
    limit: '10mb'
}));

//Create new User on /api/users/signup Sign Up Form, No Auth
userRouter.post("/signup", cors(corsOptions), createUser)

//Get user on /api/users/login or Login form, No Auth
userRouter.post("/login", cors(corsOptions), login);

//Get Loggedin user details on /api/users/getuser, Auth Required.
userRouter.post("/getuser", isAuthenticated, cors(corsOptions), getUser);

//User Profile changed (fullName, password) /api/users/updateuser, Auth Required.
userRouter.put("/updateuser/:id", isAuthenticated, cors(corsOptions), updateUser);



//Avatar upload multer declaration
// const upload = multer({
//     limits: {
//         fileSize: 5000000 //5 MB size limit
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(JPG|JPEG|jpg|jpeg|PNG|png|gif|GIF|BMP|bmp)$/)){
//             return cb(new Error('File must be an image'))
//         }
//         cb(undefined,true)
//     }
// });

//Avatar Upload / get / delete
userRouter.post("/avatar", isAuthenticated, cors(corsOptions), uploadFile.single('avatar'), uploadAvatar)
//userRouter.delete('/avatar', isAuthenticated, cors(corsOptions), deleteAvatar)
// userRouter.get('/avatar/:id',  getAvatar)

export default userRouter;
