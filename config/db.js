const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const conSuccess = mongoose.connection;
    conSuccess.once("open", (_) => {
      console.log("Database connected:", db);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
