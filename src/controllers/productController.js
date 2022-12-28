import expressAsyncHandler from "express-async-handler"
import Product from "../models/products.js"
import sharp from "sharp";

const addProduct = expressAsyncHandler(async(req, res)=>{
    try {
        const { productName, description, active, sku, brand, 
            category, price, discount, quantityInStock
             } = req.body;
             console.log(req.body);
        const product = new Product ({
            productName, description, active,sku, brand, 
            category, price, quantityInStock, discount, user: req.user.id
        })
        const saveproduct = await product.save()
        res.json(saveproduct)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const updateProduct = expressAsyncHandler(async(req, res)=>{
    try {
        const { productName, description, active, brand, 
            category, price, discount, quantityInStock, sku
             } = req.body;

        //find a product with same user token to be updated
        const product = await Product.findOne({_id: req.params.id, user: req.user.id});
 
        if(!product) {return res.status(404).send("Product Not Available")}
  
        if(productName){product.productName=productName};
        if(brand){product.brand=brand};
        if(category){product.category=category};
        if(price){product.price=price};
        if(discount){product.discount=discount};
        if(quantityInStock){product.quantityInStock=quantityInStock};
        if(description){product.description=description};
        if(sku){product.sku=sku};
        if(active){product.active=active};
        //update the note
        await product.save();
        res.status(200).send({product})
        console.log(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
})

const getProducts = expressAsyncHandler(async(req, res)=>{
    try {
        const product = await Product.find({user: req.user.id});
        res.json(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const deleteProduct = expressAsyncHandler(async(req, res)=>{
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

const uploadImages = expressAsyncHandler( async (req, res)=>{
    // try {
    // const id = req.params.id;
    // const product = await Product.findOne({_id: id, user: req.user.})

    // //find a product with same user token to be deleted
    // if(!product) {return res.status(404).send("Product Not Available")}
    
    //   const bufferImg = await sharp(req.file.buffer).resize({width:500, height:500}).png().toBuffer()
    //   req.user.avatar = bufferImg;
    //   await req.user.save();
    //   res.status(200).json ({message: 'Avatar updated successfully'})
    // } catch (error) {
    //   console.log(`Error: ${error.message}`);
    //   res.status(400).send(error.message);
    // }
    res.status(200).json({message: 'Image uploaded'});
});
  
const getImages = expressAsyncHandler(async (req,res)=>{
    try {
      console.log(req.params.id);
      const user = await User.findById(req.params.id)
  
      if(!user || !user.avatar){
          throw new Error()
      }
      res.set('Content-Type','image/png')
      res.send(user.avatar)
  }catch(e) {
      console.log(`Error: ${error.message}`);
      res.status(400).send(error.message);
  }
});
  
const deleteImages = expressAsyncHandler(async (req,res)=>{
    try {
      req.user.avatar = undefined
      await req.user.save()
      res.send()
  }catch(e) {
      console.log(`Error: ${error.message}`);
      res.status(400).send(error.message);
  }
});

export {
    addProduct, getProducts, updateProduct, deleteProduct, uploadImages, getImages, deleteImages
}