var express = require('express');
var router = express.Router();
var Post = require("../models/post");
var middleware = require("../middleware")







  //CREATE - POST ROUTE FOR POSTS
router.post("/new", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var images = req.body.image;
    var body = req.body.body;
    

    var newPost = {name: name, images: images, body:body}
  
   Post.create(newPost, function(err, newlyCreated){
     if(err){
       console.log(err);
     }
  
     else{
       res.redirect("/")
     }
   })

})



//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("posts/new")
  })



//SHOW ROUTE
router.get("/:id", function(req,res){
    Post.findById(req.params.id).exec(function(err, foundPost){
        if(err){

            res.status(404).render("404")

            console.log(err)
            
        }
        else{
            console.log(foundPost)
            if(foundPost == null){
                res.status(404).render("404")
            }
            res.render("posts/show", {post:foundPost})
        }
    })
})
  
//EDIT ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req,res){
    Post.findById(req.params.id, function(err, foundPost){
        res.render("posts/edit", {post:foundPost})

    })
})



//UPDATE ROUTE
router.put("/:id", middleware.isLoggedIn, function(req,res){ 

    console.log(req.body.post.name)
    console.log(req.body.post.images)


    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            console.log(err)
            res.redirect("/")
        }
        else{
            res.redirect("/post/" + req.params.id)
        }
    })
})


router.delete("/:id", middleware.isLoggedIn, function(req,res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/post/" + req.params.id)
        }
        else{
            res.redirect("/")
        }
    })
})


module.exports = router;