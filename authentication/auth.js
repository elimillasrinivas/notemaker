const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    try {
        
        const cookie=req.session.jwttoken

        const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY || "secret"
        // const result=jwt.verify(cookie,JWT_SECRET_KEY)
        req.result=result.data.data
        if(result){
            next()
        }
        else{
            res.status(200).json({
                message:"Re-log in"
            })
        }

    } catch (error) {
        console.log(error);
    }
}
module.exports={auth}