const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"Price cannot be greater than 8 figure"]
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
            {
                public_id:{
                type:String,
                required:true
                },
                url:{
                    type:String,
                    required:true
                }
            }
       
    ],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        default:1,
        required:[true,"Please enter product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})

const Product = new mongoose.model("Product", productSchema);

module.exports = Product