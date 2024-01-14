const express = require("express");
const router = express.Router();
const passport = require("passport");
const { IsAuthenticated } = require("../middlewares/IsAuthenticated");
require("dotenv").config();

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/success", (req, res) => {
	return res.status(200).send(req.user._doc);
});

router.get("/google/failure", (req, res) => {
	return res.status(500).send("something went wrong");
});

router.get("/logout", (req, res) => {
	req.session.destroy();
	req.logout();
	res.redirect("http://localhost:5173/login");
});

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: "http://localhost:5173",
// 		failureRedirect: "/api/v1/auth/google/failure",
// 	})
// );

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:5173/login",
		session: false,
	}),
	(req, res) => {
		const user = req.user._doc;
		res.cookie("access_token", user, { httpOnly: true, sameSite: true });
		res.redirect("http://localhost:5173/login");
	}
);

router.get("/currentUser", IsAuthenticated, (req, res) => {
	return res.status(200).send(req.user._doc);
});

module.exports = router;
