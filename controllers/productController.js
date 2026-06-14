import Product from "../models/product.js";
import { isAdmin } from "../middlwares/authentication.js";

export async function createProduct(req,res){
    
    try{
        if(isAdmin(req)){
           const product = new Product(req.body)
           const p = await product.save() 
           res.json({
                message: "Product created successfully"
           })
        }else{
            res.json({
                message: "You are not Autherized to create Products"
            })
            return
        }

    }catch(error){
        console.log(error)
        res.json({
            message: "internal server error"
        })
    }
}

export async function getProducts(req, res) {
    try{
        if(isAdmin){
           const products = await Product.find()
           res.json(products)
        }else{
            const products = await Product.find({isAvailable: true})
            res.json(products)
        }

    }catch(error){
        res.json(error)
    }
}

export async function deleteProduct(req, res) {
    
    try{
        const productId = req.params.productID//url eke dena id ek gnne mehemai

        if(isAdmin(req)){
            const product = await Product.findOne({productID: productId})

            if(product == null){
                res.json({
                    message: "Product does not exist"
                })
                return
            }
            await Product.findOneAndDelete({productID : productId})
            res.json({
                message: "Product deleted successfully"
            })
        }else{
            res.json({message: "You are not Autherized to delete products"})
        }   
    }catch(error){
        console.log(error)
        res.json({
            message: "Internal server error"
        })
    }
    
}
export async function updateProduct(req,res){
    try{
        const productId = req.params.productID
        if(isAdmin(req)){
            const product = await Product.findOne({productID : productId})

            if(product == null){
                res.json({message: "Product does not exist"})
                return
            }

            await Product.findByIdAndUpdate({productID: productId}, req.body)
            res.json({message: "Product updated successfully"})
        }

    }catch(error){
        console.log(error)
        res.json({message: "Internal Server error"})
    }
}

export async function getProductById(req,res){
    try{
        const productId = req.params.productID
        const product = await Product.findOne({productID: productId})

        if(product == null){
            res.json({message:"Product does not exist"})
            return
        }
        if(product.isAvailable){
            res.json(product)
        }else{
            if(isAdmin(req)){
                res.json(product)
            }
        }
    }catch(error){
        console.log(error)
        res.json({message: "Internal Server Error"})
    }
}