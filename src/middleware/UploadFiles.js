import multer from "multer";
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        console.log(req.params);
        const __dirname = path.resolve();
        const productid = req.params.id;
        const dir = __dirname + '/ProductImages/' + req.user._id + '/' + productid;
        //req.avatarname=file.originalname;

        console.log(file.originalname);

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

const multiple  = multer({
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

export default multiple;