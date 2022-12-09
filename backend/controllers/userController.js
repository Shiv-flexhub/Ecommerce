const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors  = require("../middleware/catchAsyncErrors");
const sendToken = require('../utils/jwtToken');

//Register a new user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample public id for user",
            url:"publicUrl"
        }
    });

    sendToken(user,201,res)
})


//Login
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email, password} = req.body;

    //checking if user has given both password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password both",400)); 
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid credentials",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid credentials",401));
    }

    sendToken(user,200,res)

})


//logout
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success:true,
        message:"You have been successfully logged out"
    })
})