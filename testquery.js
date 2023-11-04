// $(document).ready(function(){
//     $(".portal_sliderlink-2").on("click", function() { // binding click event
//         window.location = "index.html";
//       });
//     $(".portal_sliderlink-3").on("click", function() { // binding click event
//         window.location = "/whatisthis/notindex.html";
//       });

//     $(".portal_sliderlink-4").on("click", function() { // binding click event
//         window.location = "/fcreviews/fcreviews.html";
//       });
    
//     $(".portal_sliderlink-5").on("click", function() { // binding click event
//         window.location = "about.html";
//       });
// });

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  var sliderlink_2 = document.createElement("div");
  document.querySelector(".portal_sliderlink-2").appendChild(sliderlink_2);
  // Add an event listener to the element
  sliderlink_2.addEventListener("click", function()
    { window.location.href = "index.html";
  });

  var sliderlink_3 = document.createElement("div");
  document.querySelector(".portal_sliderlink-3").appendChild(sliderlink_3);
  // Add an event listener to the element
  sliderlink_3.addEventListener("click", function()
    { window.location.href = "/whatisthis/notindex.html";
  });

  var sliderlink_4 = document.createElement("div");
  document.querySelector(".portal_sliderlink-4").appendChild(sliderlink_4);
  // Add an event listener to the element
  sliderlink_4.addEventListener("click", function()
    { window.location.href = "/fcreviews/fcreviews.html";
  });

  var sliderlink_5 = document.createElement("div");
  document.querySelector(".portal_sliderlink-5").appendChild(sliderlink_5);
  // Add an event listener to the element
  sliderlink_5.addEventListener("click", function()
    { window.location.href = "about.html";
  });
});