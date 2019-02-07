var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet')

var path = require('path');
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Post = require("./models/post");
var User = require("./models/user")
var Post = require("./models/post2")
var mongoose = require("mongoose");
const port = process.env.PORT || 3000;



var postsRoutes = require('./routes/posts');
var indexRoutes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


//Connect to the mongoDB database
mongoose.connect("mongodb://localhost/college");

//PASSPORT CONFIGURATION

app.use(require("express-session")({
  secret: "What is dead may never die",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(methodOverride("_method"));



app.use(helmet());

app.use("/post",postsRoutes)
app.use(indexRoutes)


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

// var newUser  = new User({username: })
// User.register(newUser,, function(err, user){

//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log(user)
//   }
// })




app.use("*", function(req,res){
  res.status(404).render("404")
})

app.listen(port, function(){
  console.log("COLLEGE PROJECT SERVER HAS STARTED")

});



module.exports = app;
