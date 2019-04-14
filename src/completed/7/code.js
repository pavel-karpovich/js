
let cardInputs = document.querySelectorAll("#frame_4 .credit-card > div:nth-of-type(1) input");

for (let i = 0; i < cardInputs.length - 1; ++i) {
    
    cardInputs[i].addEventListener("keyup", function(e) {
        
        if (e.target.value.length == 4) {
            cardInputs[i + 1].focus();
        }
    });

}

let sections = document.querySelectorAll("main section");
let indicator = document.querySelector(".indicator");
let steps = document.querySelectorAll(".indicator .step");
let wire = document.querySelector(".indicator .wire");

let regButton = document.getElementsByName("reg")[0];
regButton.addEventListener("click", function() {
    sections[0].classList.add("invisible");
    sections[1].classList.remove("invisible");
    indicator.classList.remove("invisible");
});

let cancelButton = document.getElementsByName("fr1_cancel_btn")[0];
cancelButton.addEventListener("click", function() {
    sections[1].classList.add("invisible");
    sections[0].classList.remove("invisible");
    indicator.classList.add("invisible");
});
let nextButton1 = document.getElementsByName("fr1_next_btn")[0];
nextButton1.addEventListener("click", function() {
    sections[1].classList.add("invisible");
    sections[2].classList.remove("invisible");
    steps[0].classList.add("completed");
    wire.style.backgroundImage = "linear-gradient(to right, #7161EF 50%, #fff 50%)";
});

let backButton1 = document.getElementsByName("fr2_back_btn")[0];
backButton1.addEventListener("click", function() {
    sections[2].classList.add("invisible");
    sections[1].classList.remove("invisible");
    steps[0].classList.remove("completed");
    wire.style.backgroundImage = "linear-gradient(to right, #fff, #fff)";
});
let nextButton2 = document.getElementsByName("fr2_next_btn")[0];
nextButton2.addEventListener("click", function() {
    sections[2].classList.add("invisible");
    sections[3].classList.remove("invisible");
    steps[1].classList.add("completed");
    wire.style.backgroundImage = "linear-gradient(to right, #7161EF, #7161EF)";
});

let backButton2 = document.getElementsByName("fr3_back_btn")[0];
backButton2.addEventListener("click", function() {
    sections[3].classList.add("invisible");
    sections[2].classList.remove("invisible");
    steps[1].classList.remove("completed");
    wire.style.backgroundImage = "linear-gradient(to right, #7161EF 50%, #fff 50%)";
});
let endButton = document.getElementsByName("fr3_end_btn")[0];
endButton.addEventListener("click", function() {
    sections[3].classList.add("invisible");
    sections[4].classList.remove("invisible");
    indicator.classList.add("invisible");
    steps[2].classList.add("completed");
});