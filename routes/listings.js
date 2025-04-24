const express=require('express');
const router=express.Router({mergeParams : true});
const wrapAsync=require('../utils/wrapAsync.js');
const {isLoggedIn, isOwner,validateListing}=require('../middleware.js');
const controller=require('../controllers/listings.js');
const multer=require('multer');
require('dotenv').config();
const {storage}=require('../cloudConfig.js');
const upload=multer({storage});

router.route('/')
.get(wrapAsync(controller.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing ,wrapAsync(controller.addListing));



router.get('/new',isLoggedIn,controller.getListingForm);

router.route('/:id')
.get(wrapAsync(controller.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(controller.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(controller.deleteListing));

router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(controller.editListingForm));

module.exports=router;