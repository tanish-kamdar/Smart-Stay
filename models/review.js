const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    rating :{
        type : Number,
        min : 0,
        max : 5
    },
    comment : {
        type : String
    },
    created_at : {
        type:Date,
        default : Date.now()
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports=mongoose.model('Review',reviewSchema);