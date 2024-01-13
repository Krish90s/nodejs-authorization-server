const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

require("dotenv").config();

const app = express();
const port = 3000;

connectDB();

app.use(
	session({
		secret: "demo",
		resave: false,
		saveUninitialized: true,
	})
);

app.use(cors());
app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("http://localhost:5173/login");
});

app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
