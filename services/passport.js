const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
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
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/v1/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("refreshToken", refreshToken);
			console.log("accessToken", accessToken);
			console.log("profile", profile);
			return done(null, { name: profile.displayName, id: profile.id });
		}
	)
);
