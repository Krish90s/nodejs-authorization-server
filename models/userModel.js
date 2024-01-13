// backend/models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: { type: String, unique: true },
		image: String,
		accounts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Account",
			},
		],
		sessions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Session",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
