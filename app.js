const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cookie=require("cookie-parser")
const cors=require("cors")
const session=require("express-session")
const userRouter = require("./routes/userRoute")
const noteRouter=require("./routes/noteRoute")
const {auth}=require("./authentication/auth")
dotenv.config()
const app=express()

const reactUrl = process.env.REACT_URL || "https://reliable-stardust-ab5d37.netlify.app/"

// DB Connection
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB Connected"))

app.use(cors({
    credentials:true,
    origin:reactUrl,
}));

// session
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"secret",
    cookie:{
        secure:false,
        maxAge:60*60*1000,
        sameSite:"lax"
    }

}))
app.use(cookie())
app.set("trust proxy",1)
app.use(express.json())


app.use("/info",auth,(req,res)=>{
const email=req.result.email
res.json({
    message:"userFound",
    email
})
})

//Routes
app.use("/user",userRouter)
app.use("/notes",noteRouter)


const PORT=process.env.PORT || 8000
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))
