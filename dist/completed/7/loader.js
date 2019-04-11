
const time = 2000;
const tick = 100;

let load = document.querySelector(".full");

let currentWidth = 0;
const maxWidth = 100;
let incrWidth = maxWidth * tick / time; 

let timer = setInterval(function() {

    if (currentWidth == maxWidth) {

        clearInterval(timer);
        let loader = document.getElementById("loader");
        loader.classList.add("invisible");
        let main = document.getElementById("page");
        main.classList.remove("invisible");
        return;
    }
    currentWidth += incrWidth;
    load.style.width = currentWidth + "%";

}, tick);
