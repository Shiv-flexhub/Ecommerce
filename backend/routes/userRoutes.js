const express = require("express")
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser} = require("../controllers/userController")
const {isAuthenticatedUser,authorizedRoles} = require("../middleware/auth")


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

//route for user details (self)
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//route for update password from the profile section
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//route for update of user details
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//route to all the users (admin access)
router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);

//route to get a single user details or update its role or delete the user (admin access)
router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
.put(isAuthenticatedUser, authorizedRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser, authorizedRoles("admin"),deleteUser);






module.exports = router