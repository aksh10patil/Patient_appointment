const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { UserSignup } = require("../mongodb/db");
const { JWT_SECRET } = require("../middleware/config");

const SignupSchema = zod.object({
    firstname : zod.string(),
    lastname: zod.string(),
    email: zod.string(),
    password: zod.string()
})

const SigninSchema = zod.object({
    email: zod.string(),
    password: zod.string()
})

router.get("/testing",(req,res)=>{
    res.send("hi from testing server")
})
router.post("/signup",async (req,res)=>{
    const obj = SignupSchema.safeParse(req.body);
    if(!obj.success){
        return res.status(404).json({
            message: "Body is not recieved and it is not able to fetch it "
        })
    }else{
        console.log("going good nice");
    }
    const ExistingUser = await UserSignup.findOne({
        email: req.body.email
    });
    const email = req.body.email;
    console.log(email);
    if(ExistingUser){
        return res.status(404).json({
            message: "Username or emailname is present already"
        })
    }
    const user = await UserSignup.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    const UserId = user._id;

    const token = jwt.sign({
        UserId
    }, JWT_SECRET);
    
    return res.json({
        message: "User has been created successfully",
        UserId : user._id,
        token : token
    })
})

router.post("/signin",async (req,res)=>{
    const obj = SigninSchema.safeParse(req.body);
    if(!obj.success){
        return res.status(404).json({
            message: "Invalid entry/ Inputs are not filled properly"
        })
    }
    const User = await UserSignup.findOne({
        email: req.body.email,
        password: req.body.password
    })
    let token;
    if(User){
        token = jwt.sign({
            userId : User._id
        },JWT_SECRET)
        return res.json({
            message: "succesfully signin in the page",
            token: token
        })
    }else{
        return res.json({
            message: "enter an valid username or password",
        })
    }
})

router.put("./update",(req,res)=>{

})

module.exports = router;