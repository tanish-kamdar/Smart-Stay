const mongoose=require('mongoose');
const Listing=require('../models/listing.js');
const init=require('./data.js');
require('dotenv').config({ path: '../.env' });

async function main(){
     await mongoose.connect(process.env.ATLASDB_URL);
     console.log('Database Connection established');
}
main().catch(err=>console.log(err));

const initDB=async ()=>{
     console.log("Data Received : ",init.data);
    await Listing.deleteMany({});
    await Listing.insertMany(init.data);
   console.log('Database Successfully Initialized');
};

initDB();