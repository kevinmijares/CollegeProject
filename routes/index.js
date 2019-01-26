var express = require('express');
var router = express.Router();
var Post = require("../models/post")
var Post2 = require("../models/post2")
var passport = require("passport")

/* GET home page. ROOT ROUTE */
router.get('/', function(req, res, next) {
  
  Post.find({}, function(err, posts){

    if(err){
      console.log(err);
    }

    else {
      res.render("index", {posts:posts})
    }

  })


});



router.get("/about", function(req, res){
  res.render("about")
})

 router.get("/login", function(req, res){
   res.render("login")
 })


router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/",
    failureRedirect: "/login"

  }), function(req, res){

  })




router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})




module.exports = router;


