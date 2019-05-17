
import {Yakubovich} from './Yakubovich.js';

let squares = document.querySelectorAll(".main-area > div");

for (let i = 0; i < squares.length; ++i) {

    let sq = squares[i];
    sq.addEventListener("click", function() {

        sq.classList.add("revealed");

    });
}

let alphabet = "абвгдеёжзийклмнопрстуфхцчшщъьыэюя";
let charBox = document.querySelector(".letter > .abc");
let word = "депиляция";

for (let i = 0; i < alphabet.length; ++i) {

    let charButton = document.createElement("div");
    charButton.innerHTML = alphabet[i].toUpperCase();
    charBox.appendChild(charButton);
    charButton.addEventListener("click", function() {

        if (word.indexOf(alphabet[i]) != -1) {
            charButton.classList.add("green");
        } else {
            charButton.classList.add("red");
        }

    });
}