const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema(
	{
		identifier: String,
		token: { type: String, unique: true },
		expires: Date,
	},
	{ timestamps: true }
);

const VerificationToken = mongoose.model(
	"VerificationToken",
	verificationTokenSchema
);

module.exports = VerificationToken;
