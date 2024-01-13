const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://90s_krishnan:n9FuPVnfiPD0Dw3W@cluster0.a24ea.mongodb.net/authorization";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    const conSuccess = mongoose.connection;
    conSuccess.once("open", (_) => {
      console.log("Database connected:", db);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
