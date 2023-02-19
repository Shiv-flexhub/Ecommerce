const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors  = require("../middleware/catchAsyncErrors")
const ApiFeatures = require('../utils/apifeatures')

//create Product (admin access)
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    req.body.user = req.user.id;
   
    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product})
})

//get all products
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query; 
    res.status(200).json({
        success:true,
        products,
        productsCount
    })
})

//Update Product (Admin access)
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)

    if(!product) return next(new ErrorHandler("product not found",404))

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
})

//Delete product (Admin access)
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product) return next(new ErrorHandler("product not found",404))

    await product.remove()

    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
})

//Get a product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product) return next(new ErrorHandler("product not found",404))

    res.status(200).json({
        success:true,
        product
    })
})


//Create and update product review
exports.createProductReview = catchAsyncErrors(async(req,res,next) => {

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString()===req.user.id.toString());
    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString()===req.user.id.toString()){
                rev.rating = rating,
                rev.comment = rating
            }
        })

    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;  
    } 

    let totalRating = 0;
    product.reviews.forEach((rev)=>{
        totalRating+=rev.rating;
    })

    product.ratings = totalRating/(product.reviews.length);

    product.save();

    res.status(200).json({
        success:true,
        message:"ratings created/updated"
    })
})

//Get all reviews of a product
exports.getAllReviewsOfProduct = catchAsyncErrors(async(req,res,next) => {
    
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found",400));
    }

    const reviews = product.reviews;

    res.status(200).json({
        success:true,
        reviews
    })
}) 

//Delete Review
exports.deleteReview = catchAsyncErrors(async(req,res,next) => {

    const product = await Product.findById(req.query.productId);
    

    if(!product){
        return next(new ErrorHandler("Product not found",400));
    }

    const reviews = product.reviews.filter((rev)=>rev._id.toString()!==req.query.reviewId.toString());


    let totalRating = 0;
    reviews.forEach((rev)=>{
        totalRating+=rev.rating;
    })

    const ratings = totalRating/(reviews.length);
    
    const numOfReviews = reviews.length;
    
    await Product.findByIdAndUpdate(req.query.productId,{
        ratings,
        reviews,
        numOfReviews
    },
    {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })


    res.status(200).json({
        success:true,
        message:"review deleted successfully"
    })
})