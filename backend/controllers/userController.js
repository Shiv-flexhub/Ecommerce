const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors  = require("../middleware/catchAsyncErrors");
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

//forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    const resetToken = user.getResetPasswordToken(); //added to database resetPasswordToken and resetPasswordExpire

    await user.save({ validateBeforeSave:false }); //saving the updates added

    //generating a url and message to send via email to the user
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it `;

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce password recovery`,
            message
        })

        res.status(200).json({
            success:true,
            message:`Email has been sent successfully to ${user.email}`
        })
        
    } catch (error) {
        //these two fields were updated and now has to be removed in case of any error
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        //saving the updates
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
    }


})

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    const resetToken = req.params.token;
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex"); //creating token hash

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt:Date.now() }
    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",404));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match",404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    sendToken(user, 200, res);


})