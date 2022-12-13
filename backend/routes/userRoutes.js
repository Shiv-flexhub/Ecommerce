const express = require("express")
const {registerUser, loginUser, logout, forgotPassword, resetPassword} = require("../controllers/userController")


const router = express.Router() 

//route to register the user
router.route("/register").post(registerUser);
//route to login the user
router.route("/login").post(loginUser);
//route to logout the user
router.route("/logout").post(logout);
//route for forgot password
router.route("/password/forgot").post(forgotPassword);
//route for reset password
router.route("/password/reset/:token").put(resetPassword);




module.exports = router