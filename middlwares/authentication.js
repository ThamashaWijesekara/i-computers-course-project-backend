import jwt from "jsonwebtoken"

export function userAuthenticate(req,res,next){

        const header = req.header("Authorization")

        if (!header) {
        return res.status(401).json({
            message: "Authorization header missing"
        })
    }

        //header eke thyn Bearer+space ek ain krnw
        const token = header.replace("Bearer ", "")

        //methn krnne token ek decode krn eka
        jwt.verify(token, "jwtkey@123",(err, decoded)=>{
            if(decoded == null){
                res.status(401).json({
                    message: "Unauthorized"
                })
            }else{
                req.user = decoded
            }
            next()//apu request ek allala ilnga ekkent ywnn kyn ek thm methn wenne

        } )

    }

    export function isAdmin(req){
     //Authorization
    if(req.user == null){
        return false
    }

    //Authorization
    if(!req.user.isAdmin){
        return false
    }
    return true
}