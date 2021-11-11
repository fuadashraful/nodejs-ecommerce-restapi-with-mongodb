const mongooser=require('mongoose');

const cartSchema=new mongooser.Schema({
    userId:{
        type:String,
        required:true,
    },
    products:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            },
        },
    ],
      
},{
    timestamps:true,
});

module.exports=mongoose.model("Cart",cartSchema);