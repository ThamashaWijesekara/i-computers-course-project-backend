import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export async function createUser(req, res) {
    
    try{


        const password = req.body.password
        const passwordHash = bcrypt.hashSync(password, 10)

        const user = new User(//methn req.body noda ar Spring wla wge DTO ekk pass krnw
            {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: passwordHash
        })
        const u = await user.save()
        res.json(
            {
                message: "user created successfully"
            }
        )
    }catch(error){
        console.log(error)
        res.json({
            message: "Internal server error"
        })
    }
    
}

export async function login(req, res){
    try{
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({email: email})

        if(user == null){
            res.status(404).json({
                message: "User not found!"
            })
            return
        }

        const isPasswordMatching = bcrypt.compareSync(password, user.password)

        if(isPasswordMatching){
            const userInfo = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                isEmailVerified: user.isEmailVerified,
                isAdmin: user.isAdmin,
                isBlocked: user.isBlocked
            }

            const token = jwt.sign(userInfo, process.env.JWT_SECRET)

            res.json({
                token: token
            })

        }else{
            //me wge than wldi apit pluwn status code ekth one nm dla ywnn
            res.status(401).json({
                message: "Invalid password"
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

