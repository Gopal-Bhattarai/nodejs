import expressAsyncHadler from "express-async-handler"
import Product from "../models/products.js"

const addProduct = expressAsyncHadler(async(req, res)=>{
    try {
        const { productName, description, tag, brand, 
            category, price, discount, quantityInStock
             } = req.body;
             console.log(req.body);
        const product = new Product ({
            productName, description, tag, brand, 
            category, price, quantityInStock, discount, user: req.user.id
        })
        const saveproduct = await product.save()
        res.json(saveproduct)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const updateProduct = expressAsyncHadler(async(req, res)=>{
    try {
        const { productName, description, tag, brand, 
            category, price, discount, quantityInStock
             } = req.body;

        //find a product with same user token to be updated
        const product = await Product.findOne({_id: req.params.id, user: req.user.id});
 
        if(!product) {return res.status(404).send("Product Not Available")}
  
        if(productName){product.productName=productName};
        if(description){product.description=description};
        if(tag){product.tag=tag};
        if(brand){product.brand=brand};
        if(category){product.category=category};
        if(price){product.price=price};
        if(discount){product.discount=discount};
        if(quantityInStock){product.quantityInStock=quantityInStock};
        //update the note
        await product.save();
        res.status(200).send({product})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
})

const getProducts = expressAsyncHadler(async(req, res)=>{
    try {
        const product = await Product.find({user: req.user.id});
        res.json(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const deleteProduct = expressAsyncHadler(async(req, res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findOne({_id: req.params.id, user: req.user.id});
        
        //find a product with same user token to be deleted
        if(!product) {return res.status(404).send("Product Not Available")}

        //delete if found
        await product.deleteOne();

        res.status(200).json({message: "Deleted"})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

export {
    addProduct, getProducts, updateProduct, deleteProduct
}