let slideIndex = 0;
 
/* Main function */
function displaySlide(n) {
    let i;
    let totalslides =
        document.getElementsByClassName("imageslide");
    let totaldots =
        document.getElementsByClassName("footerdot");
    let carousel =
        document.getElementsByClassName("carousel");
 
    for (i = 0; i < totaldots.length; i++) {
        totaldots[i].className =
            totaldots[i].className.replace(" active", "");
    }
    totaldots[slideIndex - 1].className += " active";

    if (n < 0) {
        slideIndex = totalslides.length - 1;
    } else if (n >= totalslides.length) {
        slideIndex = 0;
    }

    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}


 const autoAdvanceInterval = 3000; // Change slide every 3 seconds

    setInterval(function() {
        displaySlide(slideIndex-1);
        slideIndex++;
    }, autoAdvanceInterval);