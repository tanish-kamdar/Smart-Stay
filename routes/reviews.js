const express=require('express');
const router=express.Router({mergeParams : true});
const wrapAsync=require('../utils/wrapAsync.js');

const controller=require('../controllers/reviews.js');

const {isLoggedIn,isAuthor,validateReview}=require('../middleware.js');

router.post('/',isLoggedIn,validateReview ,wrapAsync(controller.addReview));

//Delete Review
router.delete('/:reviewId',isLoggedIn,isAuthor,wrapAsync(controller.destroyReview));

module.exports= router;