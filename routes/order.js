const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require('../middleware/verifyToken');
const route=require('express').Router();
const CryptoJS=require('crypto-js');
const Order = require('../models/Order');

// create order
route.post('/',verifyToken, async (req,res)=>{
    const newOrder=new Cart(req.body);
    try{
        const savedOrder=await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
         res.status(401).json(err);
    }
});

// Update order
route.put('/:id',verifyTokenAndAdmin,async (req,res)=>{
    try{
        const updatedOrder=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        });
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

// DELETE order
route.delete('/:id',verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!!!");
    }catch(err){
        res.status(500).json(err);
    }
});


//GET User Orders
route.get('/find/:userId',verifyTokenAndAuthorization,async (req,res)=>{

    try{
        const orders=Order.find({
            userId:req.params.userId
        });
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});


//GET all Orders
route.get('/',verifyTokenAndAdmin,async (req,res)=>{

    try{
        const orders=await Order.find();
        res.json(200).json(orders);
    }catch(err){
        res.status(401).json(err);
    }
});


module.exports=route