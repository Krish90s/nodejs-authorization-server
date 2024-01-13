const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
	{
		userId: String,
		type: String,
		provider: String,
		providerAccountId: String,
		refresh_token: String,
		access_token: String,
		expires_at: Number,
		token_type: String,
		scope: String,
		id_token: String,
		session_state: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
