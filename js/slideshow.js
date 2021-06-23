/*
THIS IS A SCRIPT FOR INDEX PAGE

THIS SCRIPT IS FOR SLIDESHOW

YOU CAN CHANGE THE TIME IT TAKES TO CHANGE SLIDES BELOW
*/

var slideIndex = 0;
showSlides();

function showSlides() {
    var slides = document.getElementsByClassName("index-slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "flex";
    setTimeout(showSlides, 5000); // EVERY 1000 IS A SECOUND
}
