const express = require("express")
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails} = require("../controllers/productController")


const router = express.Router() 

//get details of all product
router.route("/products").get(getAllProducts)

//create a new product -->Admin
router.route("/product/new").post(createProduct)

//update and delete a product -->Admin
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)




module.exports = router