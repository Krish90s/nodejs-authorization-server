const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const logger = require("morgan");
const MongoDBStore = require("connect-mongodb-session")(session);
require("./config/passport");
require("dotenv").config();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(logger("dev"));
app.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
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
