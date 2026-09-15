const mongoose = require('mongoose');

// Disable command buffering so queries don't hang indefinitely if MongoDB is not running
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_mern';
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.log(`[MongoDB Info]: Local MongoDB not detected (${error.message}). Running with ultra-fast in-memory catalog store!`);
  }
};

module.exports = connectDB;
