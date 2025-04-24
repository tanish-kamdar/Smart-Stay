const Listing=require('../models/listing');
require('dotenv').config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geocodingClient=mbxGeocoding({accessToken : mapToken});

module.exports.index= async (req,res)=>{
    let listings= await Listing.find();
    res.render('listings/index.ejs',{listings});
};

module.exports.addListing=async (req, res)=>{

    let geoResponse= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();
    let geometry=geoResponse.body.features[0].geometry;
    let listing=new Listing(req.body.listing);
    listing.owner=req.user._id;
    let url= req.file.path;
    let filename = req.file.filename;
    listing.image={
        url : url,
        filename : filename
    }
    listing.geometry=geometry;
    await listing.save();
    req.flash('success','Listing was successfully added.');
    res.redirect('/listings');
};

module.exports.getListingForm=(req,res)=>{
    res.render('listings/add.ejs');
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id).populate({path : "reviews", populate : { path : 'author'}}).populate('owner');
    if(!listing){
        req.flash('failure','Listing you requested, doesn\'t exist.');
        res.redirect('/listings');
    }
    res.render('listings/show.ejs',{listing});
};

module.exports.editListingForm=async (req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById({_id : id});
    if(!listing){
        req.flash('failure','Listing you requested, doesn\'t exist.');
        res.redirect('/listings');
    }
    let originalUrl=listing.image.url;
    originalUrl=originalUrl.replace('/upload','/upload/w_250');
    res.render('listings/edit.ejs',{listing,originalUrl});
};

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let updated=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(!updated){
        req.flash('failure','Listing was not updated.');
        return res.redirect(`/listings/${id}`); 
    }

    if(typeof req.file!='undefined'){
        let url=req.file.path,filename=req.file.filename;
        updated.image={url,filename};
        await updated.save();
    }
    req.flash('success','Listing was successfully updated.');
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async (req,res)=>{
    
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Listing was successfully deleted.');
    res.redirect('/listings');
};