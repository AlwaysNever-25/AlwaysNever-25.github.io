$(document).ready(function(){
    $(".portal_sliderlink-1").on("click", function() { // binding click event
      window.location = "index.html";
    });
    $(".portal_sliderlink-2").on("click", function() { // binding click event
        window.location = "beer.html";
      });
    $(".portal_sliderlink-3").on("click", function() { // binding click event
        window.location = "/fcreviews";
      });

    $(".portal_sliderlink-4").on("click", function() { // binding click event
        window.location = "/normalreviews";
      });
    
    $(".portal_sliderlink-5").on("click", function() { // binding click event
        window.location = "about.html";
      });
});