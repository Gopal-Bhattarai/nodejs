import cors from 'cors';
import express from 'express';
import isAuthenticated from '../middleware/Auth.js';
import Product from '../models/products.js'
import corsOptions from '../middleware/corsOptions.js';
import {addProduct, getProducts, updateProduct, deleteProduct} from '../controllers/productController.js'
const productRouter = express.Router();

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

export default productRouter;