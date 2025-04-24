const mongoose=require('mongoose');
const wrapAsync = require('../utils/wrapAsync');
const Review=require('./review');

let listingSchema=new mongoose.Schema({
    title : {
        type: String
    },
    description : {
        type : String
    },
    image : {
        url : String,
        filename : String
    },
    price : {
        type : Number
    },
    location : {
        type : String
    },
    country :{
        type : String
    },
    reviews : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Review"
        }
    ] ,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    geometry : {
        type : {
            type : String,
            enum : ['Point'],
            required : true
        },
        coordinates : {
            type : [Number],
            required:true
        }
    }

});

listingSchema.post('findOneAndDelete',async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});
let Listing =mongoose.model('Listing',listingSchema);


module.exports = Listing ;