const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    //Wrong mongodb id error
    if(err.name=="CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400)
    }
    
    //Mongoose duplicate key error
    if(err.code == 11000 ){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }

    //Wrong jwt error
     if(err.name=="JsonWebTokenError"){
        const message = `Json Web token is invalid, Try again!`;
        err = new ErrorHandler(message,400)
    }

    //jwt expire error
     if(err.name=="TokenExpiredEror"){
        const message = `Json Web token is expired, Try again!`;
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message, //error:err.stack(for displaying the exact line where the error has occured)
        statusCode:err.statusCode
    });
   
};