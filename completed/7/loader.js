
const time = 2000;
const tick = 100;

const load = document.querySelector(".full");

let currentWidth = 0;
const maxWidth = 100;
const incrWidth = maxWidth * tick / time; 

const timer = setInterval(function() {
    if (currentWidth == maxWidth) {
        clearInterval(timer);
        const loader = document.getElementById("loader");
        loader.classList.add("invisible");
        const main = document.getElementById("page");
        main.classList.remove("invisible");
        return;
    }
    currentWidth += incrWidth;
    load.style.width = currentWidth + "%";
}, tick);
