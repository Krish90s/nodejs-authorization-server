const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `http://localhost:5173`,
    failureRedirect: "/api/v1/auth/google/failure",
  })
);

router.get("/google/success", (req, res) => {
  console.log(req);
  if (req?.user) {
    return res.status(200).json(req?.user?._doc);
  } else {
    return res.status(401).send("Un Authorized");
  }
});

router.get("/google/failure", (req, res) => {
  return res.status(500).send("something went wrong");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect(`${process.env.CLIENT_URL}/login`);
});

router.get("/currentUser", (req, res) => {
  console.log(req?.user?._doc);
  return res.status(200).send(req.user);
});

module.exports = router;
