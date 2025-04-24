const mongoose=require('mongoose');
const Listing=require('../models/listing.js');
const init=require('./data.js');

async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
     console.log('Database Connection established');
}
main().catch(err=>console.log(err));

const initDB=async ()=>{
    await Listing.deleteMany({});
    init.data =init.data.map((obj)=>({...obj,owner : '67fba7e9c5542ba8f6859cc6'}));
    await Listing.insertMany(init.data);
   console.log('Database Successfully Initialized');
};

initDB();