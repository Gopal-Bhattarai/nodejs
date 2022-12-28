import multer from "multer";
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const __dirname = path.resolve();
        const dir = __dirname + '/ProductImages/' + req.user._id;
        req.avatarname=file.originalname;

         if(!fs.existsSync(dir)) {
             fs.mkdirSync(dir);
         }
        cb(null, dir);
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null, file.originalname);
    }
});

const uploadFile = multer({
    storage: storage,
    filFilter: (req, file, cb) =>{
        if(file.originalname.match(/\.(JPG|JPEG|jpg|jpeg|PNG|png|gif|GIF|BMP|bmp)$/)){
            cb(null,true);
        }else {
            cb(null,false);
            return cb(new Error('Only .png, .jpg .jpeg, .gif or bmp format allowed'));
        }
    }
});

export default uploadFile;