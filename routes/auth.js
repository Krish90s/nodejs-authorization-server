const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Account = require("../models/accountModel");
const User = require("../models/userModel");
require("dotenv").config();

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env["GOOGLE_CLIENT_ID"],
			clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
			callbackURL: "/api/v1/auth/google/callback",
		},
		async function (accessToken, refreshToken, profile, cb) {
			try {
				const cred = await Account.findOne({
					provider: profile.provider,
					providerAccountId: profile.id,
				});

				if (!cred) {
					// The Google account has not logged in to this app before. Create a new user record and link it to the Google account.
					const newUser = new User({
						name: profile.displayName,
						image: profile?._json.picture,
						email: profile?._json.email,
					});

					const user = await newUser.save();

					const newAccount = new Account({
						user_id: user._id,
						provider: profile.provider,
						providerAccountId: profile.id,
					});

					await newAccount.save();

					const userData = {
						id: user._id.toString(),
						name: user.name,
						image: user.image,
						email: user.email,
					};
					return cb(null, userData);
				} else {
					// The Google account has previously logged in to the app. Get the user record linked to the Google account and log the user in.
					const user = await User.findById(cred.userId);

					if (!user) {
						return cb(null, false);
					}

					return cb(null, user);
				}
			} catch (err) {
				return cb(err);
			}
		}
	)
);

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:5173/login",
		failureMessage: true,
	}),
	function (req, res) {
		res.redirect("http://localhost:5173/");
	}
);

module.exports = router;
