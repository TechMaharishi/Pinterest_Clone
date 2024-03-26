// Import required modules
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
var createError = require("http-errors");

// Import route handlers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Create an Express application
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session setup
app.use(expressSession({ 
  secret: "YourSecretKey", 
  resave: false, 
  saveUninitialized: false 
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport user serialization and deserialization
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

// Flash messages
app.use(flash());

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing setup
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 Error handling
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handling
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Export the Express application
module.exports = app;
