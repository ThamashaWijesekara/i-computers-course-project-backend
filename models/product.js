import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    productID :{
        type : String,
        unique: true,
        required : true
    },
    name: {
        type : String,
        required: true
    },
    alterName: {
        type : [String],
        default : []
    },
    discription : String,
    images: {
        type : [String],
    },
    price: {
        type : Number,
        required: true
    },
    labelPrice : {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    category: String,
    brand: String,
    model: String
})

const Product = mongoose.model("products", productSchema)

export default Product