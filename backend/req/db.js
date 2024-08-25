const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sindhura:password@123@cluster0.ub5nh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
