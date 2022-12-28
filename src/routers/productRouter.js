import cors from 'cors';
import express from 'express';
import isAuthenticated from '../middleware/Auth.js';
import Product from '../models/products.js'
import corsOptions from '../middleware/corsOptions.js';
import {addProduct, getProducts, updateProduct, 
    deleteProduct, uploadImages, deleteImages, getImages} from '../controllers/productController.js'
const productRouter = express.Router();
import multiple from '../middleware/UploadFiles.js';

productRouter.options("*",cors());
productRouter.use(express.json());

//Route to fetch all products for corresponding user: Login required
productRouter.get('/getProducts', isAuthenticated, cors(corsOptions), getProducts)

//Route to create a new product for corresponding user: Login required
productRouter.post('/addproduct', isAuthenticated, cors(corsOptions), addProduct)

//Route to update a new product for corresponding user: Login required
productRouter.put('/updateproduct/:id', isAuthenticated, cors(corsOptions), updateProduct)

//Route to delete a new product for corresponding user: Login required
productRouter.delete('/deleteproduct/:id', isAuthenticated, cors(corsOptions), deleteProduct)

//Images upload multer declaration
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
//testing multer middleware
productRouter.post("/images/:id", isAuthenticated, cors(corsOptions), multiple.array('imageList'), (req,res)=>{
    res.json({message:'images uploaded'})
})
//productRouter.post("/images/:id", isAuthenticated, cors(corsOptions), upload.array('imageList'), uploadImages)
productRouter.delete('/images/:id', isAuthenticated, cors(corsOptions), deleteImages)
productRouter.get('/images/:id',  getImages)


export default productRouter;