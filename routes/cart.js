const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require('../middleware/verifyToken');
const route=require('express').Router();
const CryptoJS=require('crypto-js');
const Cart = require('../models/Cart');

// create cart
route.post('/',verifyTokenAndAdmin, async (req,res)=>{
    const newCart=new Cart(req.body);
    try{
        const savedCart=await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
         res.status(401).json(err);
    }
});

// Update cart
route.put('/:id',verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const updatedCart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        });
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

// DELETE
route.delete('/:id',verifyTokenAndAuthorization,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted!!!");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET User Cart
route.get('/find/:userId',verifyTokenAndAuthorization,async (req,res)=>{

    try{
        const cart=Cart.findOne({
            userId:req.params.userId
        });
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET all carts
route.get('/',verifyTokenAndAdmin,async (req,res)=>{

    try{
        const carts=await Cart.find();
        res.json(200).json(carts);
    }catch(err){
        res.status(401).json(err);
    }
});

module.exports=route