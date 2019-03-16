
var postsLoaded = 8;
var i = postsLoaded;

$(function (){
    $("#loadButton").click(function(){

    

        $.getJSON("/post/api")
        .done(function(posts){
            var reversePosts = posts.slice()

            if(postsLoaded == reversePosts.length){
                $("#loadButton").text("No More Posts") 
            }
            else{
                for(i; (i <= postsLoaded+ 3) || (i == reversePosts.length -1); i++){



                    $("#postsContainer").append('<div class="col-lg-2 col-md-4 col-sm-6 padding-0 container"> <a href="/post/' +reversePosts[i]._id + '"><img src="/images/' + reversePosts[i].images[0]+ '" class="img-fluid "></a><div class="middle"><a href="/post/' +reversePosts[i]._id+'"><div class="text">' + reversePosts[i].name + '</div></a></div></div>')
                }
                postsLoaded = i;
                     
                   
                }
            })
        })            
    


$(document).scroll(function(){
    var $nav = $("#navBar")
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());



    })
})

