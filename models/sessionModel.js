const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
	{
		sessionToken: { type: String, unique: true },
		userId: String,
		expires: Date,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
