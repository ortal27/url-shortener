const mongoose = require('mongoose');
// require('dotenv').config({ path: './.env' });

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost/urlShortener', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;