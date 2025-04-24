const express=require('express');
const router=express.Router({mergeParams : true});
const wrapAsync=require('../utils/wrapAsync.js');
const passport=require('passport');
const {saveRedirectUrl }=require('../middleware.js');
const controller=require('../controllers/users.js');
//SignUp
router.route('/signup')
.get(controller.getSignupForm)
.post(wrapAsync(controller.addUser));

//Login
router.route('/login')
.get(controller.getLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect : '/user/login', failureFlash : true}),wrapAsync(controller.login));

//Logout
router.get('/logout',controller.logout);

module.exports= router;