const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const signUp=async (req,res)=>{
     try {
        
        const emailFound=await User.findOne({email:req.body.email})
        if(emailFound){
            res.json({
                message:"Email is already Existed"
            })
        }
        else{
            const {email,password}=req.body
            bcrypt.hash(password,10, async(err,hash)=>{
                if(err) throw err
                const newUser=await User.create({
                    email,
                    password:hash
                })
                res.json({
                    message:"Rigistration Success",
                    result:newUser
                })
            })
        }

     } catch (error) {
        console.log(err);
     }
}

const signIn=async(req,res)=>{
    const {email,password}=req.body
    const oldUser=await User.findOne({email})

    if(oldUser){
        bcrypt.compare(password,oldUser.password,(err,result)=>{
            if(err) throw err
            if(result){
                let tokenData={
                    data:oldUser
                }
                const token=jwt.sign({
                    data:tokenData

                },process.env.JWT_SECRET_KEY || "secret")
                
                req.session.jwt=token
                res.json({
                    message:"Log in Success",
                    token
                })
            }


        })
    }
    else{
        res.json({
            message:"User not Registered"
        })
    }
}

const signOut=async(req,res)=>{
        req.session.jwt=""
        res.json({
            message:"Log out Success"
        })
}

module.exports={signUp,signIn,signOut}