// db.js
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    // Replace the URL with your MongoDB Atlas or local connection string
    const conn = await mongoose.connect(process.env.ATLASDB_URL);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    process.exit(1);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Stop the app if it can't connect
  }
};

connectDB();
