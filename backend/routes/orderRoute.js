const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getAllReviewsOfProduct, deleteReview} = require("../controllers/productController")
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");


const router = express.Router() 

//route to add new order
router.route("/order/new").post(isAuthenticatedUser,newOrder);
//route to get a single order 
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
//route to get all orders of a user
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
//route to get all the orders of all the users --admin
router.route("/admin/orders")
.get(isAuthenticatedUser,authorizedRoles("admin"),getAllOrders);
//route to update and delete a order --admin
router.route("/admin/order/:id")
.put(isAuthenticatedUser,authorizedRoles("admin"),updateOrderStatus)
.delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder);


module.exports = router;