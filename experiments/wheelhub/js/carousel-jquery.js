let indexSlider = 0;
const slides = $('.carousel-slider img');

function showImage(index){
    if(index < 0){
        indexSlider = slides.length - 1;
    }else if(index >= slides.length){
        indexSlider = 0;
    }
    var width = slides.width();
    const offset = -indexSlider * width;
    $('.carousel-slider').animate({
        "margin-left": + offset + "px"
    }, 500)
}

function prev(){
    indexSlider--;
    showImage(indexSlider);
    console.log("Prev clicked");
}

function next(){
    indexSlider++;
    showImage(indexSlider);
    console.log("Next clicked");
}

$('.button-prev').click(prev);
$('.button-next').click(next);
