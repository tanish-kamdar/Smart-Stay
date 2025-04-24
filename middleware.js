const Listing=require('./models/listing');
const {reviewSchema }=require('./schema');
const Review=require('./models/review');
const {listingSchema}=require('./schema.js');
const ExpressError=require('./utils/ExpressError.js');

module.exports.validateListing=(req,res,next)=>{
    const result=listingSchema.validate(req.body);
    if(result.error) throw new ExpressError(400,result.error);
    next();
}

module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        if(req.method === 'GET')
        req.session.redirectUrl=req.originalUrl;
    
        req.flash('error','You must be logged in before accessing this feature.');
        return res.redirect('/user/login');
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate('owner');

    if(!res.locals.currUser || !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash('error','Only the owner of the listing is allowed to edit or delete the listing.');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor= async (req,res,next)=>{
    let {reviewId, id}=req.params;
    let review=await Review.findById(reviewId).populate('author');
    if(!req.user || !req.user._id.equals(review.author._id)){
        req.flash('error',`Only the author of the review can delete the review`);
        return res.redirect(`/listings/${id}`);
    }
    
    next();
}

module.exports.validateReview=(req,res,next)=>{
    const result=reviewSchema.validate(req.body);
    if(result.error) throw new ExpressError(400,result.error);
    next();
}