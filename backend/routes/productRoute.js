const express = require("express")
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails} = require("../controllers/productController")
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")


const router = express.Router() 

//get details of all product
router.route("/products").get(getAllProducts);

//create a new product -->Admin
router.route("/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct)

//update and delete a product -->Admin
router.route("/product/:id")
.put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
.get(getProductDetails)




module.exports = router