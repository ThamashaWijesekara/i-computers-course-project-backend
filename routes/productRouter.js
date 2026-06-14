import express from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post("/", createProduct)
productRouter.get("/", getProducts)
productRouter.delete("/:productID",deleteProduct)
productRouter.put("/",updateProduct)
productRouter.get("/:productID", getProductById)

export default productRouter