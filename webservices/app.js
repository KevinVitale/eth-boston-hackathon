require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var exphbs  = require("express-handlebars");
var logger = require("morgan");

const indexRoute = require("./routes/index");
const createRoute = require("./routes/create");
var app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoute);
app.use("/create", createRoute);
// app.use('/transfer', require('./routes/transfer'));

// error handler
app.use(function(err, req, res) {
  console.err(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
