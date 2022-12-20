const express = require("express")
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getAllReviewsOfProduct, deleteReview} = require("../controllers/productController")
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")


const router = express.Router() 

//get details of all product
router.route("/products").get(getAllProducts);

//create a new product -->Admin
router.route("/admin/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct)

//update and delete a product -->Admin
router.route("/admin/product/:id")
.put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)

//route to get product details
router.route("/product/:id").get(getProductDetails);

//route for creating/updating product review
router.route("/review").put(isAuthenticatedUser, createProductReview);

//route to get all reviews and delete review
router.route("/reviews").get(isAuthenticatedUser,getAllReviewsOfProduct).delete(isAuthenticatedUser,deleteReview);




module.exports = router