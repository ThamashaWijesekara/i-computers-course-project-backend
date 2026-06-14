import express from 'express'
import mongoose from 'mongoose'
//methna .js dnn oni agata
import User from './models/user.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import jwt from 'jsonwebtoken'
import { userAuthenticate } from './middlwares/authentication.js'
import dotenv from "dotenv"
dotenv.config()

const connectionString = process.env.MONGO_URL

//meka promise ekak
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connected!")
})

const app = express()

app.use(express.json())//meken thm req body wl thyn JSON read krgnne undefined wenne nthuw

////Authentication
//app.use(userAuthenticate)//mehem thibbm login wen ekth ekkm okkom protected wenw
//one thnta withrk dnn e nis

app.listen(3000, ()=>{
    console.log("Server is running!")
})

app.use("/users",userRouter)
app.use("/products",userAuthenticate,productRouter)
