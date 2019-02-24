
$(function (){
$(document).scroll(function(){
    var $nav = $("#navBar")
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
});
});
