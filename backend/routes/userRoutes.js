const express = require("express")
const {registerUser, loginUser, logout} = require("../controllers/userController")


const router = express.Router() 

//route to register the user
router.route("/register").post(registerUser);
//route to login the user
router.route("/login").post(loginUser);
//route to logout the user
router.route("/logout").post(logout);



module.exports = router