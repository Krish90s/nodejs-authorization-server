const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const Account = require("../models/accountModel");
const User = require("../models/userModel");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const cred = await Account.findOne({
          provider: profile.provider,
          providerAccountId: profile.id,
        });

        if (!cred) {
          // The Google account has not logged in to this app before. Create a new user record and link it to the Google account.
          const newUser = new User({
            name: profile.displayName,
            image: profile?.picture,
            email: profile?.email,
          });

          const user = await newUser.save();

          const newAccount = new Account({
            userId: user._id,
            provider: profile.provider,
            providerAccountId: profile.id,
            refresh_token: "refreshToken",
            access_token: accessToken,
          });

          const accountData = await newAccount.save();

          const userData = {
            id: user._id.toString(),
            name: user.name,
            image: user.image,
            email: user.email,
            refreshToken: accountData?.refresh_token,
            accessToken: accountData.access_token,
          };
          return done(null, userData);
        } else {
          const updatedCred = await Account.findOneAndUpdate(
            {
              provider: profile.provider,
              providerAccountId: profile.id,
            },
            { refresh_token: "refreshToken", access_token: accessToken },
            { new: true }
          );

          // The Google account has previously logged in to the app. Get the user record linked to the Google account and log the user in.
          const userData = await User.findById({ _id: updatedCred.userId });

          const mergedUserData = {
            ...userData,
            refreshToken: "refresh_token",
            accessToken: updatedCred.access_token,
          };

          if (!mergedUserData) {
            return done(null, false);
          }
          return done(null, mergedUserData);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
