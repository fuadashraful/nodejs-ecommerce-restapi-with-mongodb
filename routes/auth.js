const route=require('express').Router();
const User=require('../models/User');
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');
// Regiseter

route.post('/register',async (req,res)=>{
    
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });

    try{
       const savedUser=await newUser.save();
       console.log(`Saved user is ${savedUser}`);
       res.status(201).json(savedUser);
    }catch(err){
        console.log(err.message);
        res.status(500).json(err);
    }
   
});
// login

route.post('/login',async (req,res)=>{
    try{
        const user=await User.findOne({
            email:req.body.email
        });
        !user && res.status(401).json("Wrong Credentials");

        const hashedPassword= CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRET);
        const originalPassword=hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword!=req.body.password && res.status(401).json("Wrong Credentials");

        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SECRET
        ,{"expiresIn":"30m"});
        const {password,...others}=user._doc;
        
        res.status(201).json({...others,accessToken});
        
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports=route