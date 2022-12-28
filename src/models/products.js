import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number
    },
    quantityInStock: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    sku:{
        type: String,
        unique: true
    },
    active:{
        type: Boolean,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    avatar:{
        type: Buffer
    },
    image: [{
        type: Buffer
    }]
}, {
    timestamp: true
})

const Product = mongoose.model("Product", productSchema);

export default Product;