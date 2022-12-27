import mongoose from 'mongoose'
import validator from 'validator';

const productSchema = mongoose.Schema({
    productName:{
        type: String,
        required: true,
        validate(value) {
            if(!validator.isLength(value, {min:3, max: 50})){
                throw new Error ('Must be at 3 to 50 characters');
            }
        }
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
    },
    quantityInStock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isLength(value, {min: 6})){
                throw new Error ('Minimum 6 characters');
            }
        }
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;