const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    emailVerified: { type: Date },
    image: { type: String },
  }, {
    timestamps: true
  });

  const User = mongoose.model('User', userSchema);
  module.exports = {User};