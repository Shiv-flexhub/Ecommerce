const Order = require("../models/orderModel");
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors  = require("../middleware/catchAsyncErrors")
const User = require('../models/userModel')

//Create a new order
exports.newOrder = catchAsyncErrors(async(req,res,next) => {

    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice,totalPrice,paidAt:Date.now(),user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
})

//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id).populate("user","name email",User);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

//get logged in user orders
exports.myOrders = catchAsyncErrors(async(req,res,next) => {

    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
})

//get all orders of all users --Admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//update order status --Admin
exports.updateOrderStatus = catchAsyncErrors(async(req,res,next) => {

    const orders = await Order.findById(req.params.id);

    if(!orders){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    if(orders.orderStatus==="Delivered"){
       return next(new ErrorHandler("The order is already delivered",400));
    }

    orders.orderItems.forEach(async order=>{
        await updateStock(order.product,order.quantity);
    })

    orders.orderStatus = req.body.status;

    if(req.body.status==="Delivered"){
        orders.deliveredAt = Date.now();
    }

    await orders.save({validateBeforeSave:false});


    res.status(200).json({
        success:true,
    })
})

async function updateStock (id, quantity){
    const product = await Product.findById(id);

    product.stock-=quantity;

    await product.save({validateBeforeSave:false});
}


//delete order --Admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    await order.remove();

    res.status(200).json({
        success:true,
        message:"order deleted"
    })
})