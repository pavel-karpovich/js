
import {Yakubovich} from './Yakubovich.js';

async function loadDictionary() {
  const response = await fetch('dictionary.json');
  const dict = await response.json();
  return dict;
}
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const poleChudes = new Yakubovich();

async function startGame() {
  const dict = await loadDictionary();
  try {
    poleChudes.start(alphabet, dict);
  } catch (err) {
    console.log(`Error with initialization in poleChudes.start: ${err}`);
    return;
  }
  const mainArea = document.querySelector('.main-area');
  let squares = null;
  let setBlock = false;

  function prepareSquares(count) {
    squares = document.querySelectorAll('.main-area > div');
    let currentCount = squares.length;
    while (currentCount !== count) {
      if (currentCount < count) {
        const additionalSquare = document.createElement('div');
        mainArea.appendChild(additionalSquare);
        currentCount++;
      } else {
        mainArea.removeChild(mainArea.lastElementChild);
        currentCount--;
      }
    }
    squares = document.querySelectorAll('.main-area > div');
  }
  prepareSquares(poleChudes.numberOfLetters);
  const letterBlocks = document.querySelectorAll('.abc > span');
  const questionText = document.querySelector('.riddle > p');
  questionText.textContent = poleChudes.question;

  function restart() {
    for (const square of squares) {
      square.textContent = '';
      square.className = '';
    }
    for (const letterBlock of letterBlocks) {
      letterBlock.className = '';
    }
    prepareSquares(poleChudes.numberOfLetters);
    questionText.textContent = poleChudes.question;
  }

  const completedCount = document.getElementById('count');
  poleChudes.onguessed = function() {
    setBlock = true;
    completedCount.textContent = poleChudes.completed;
    setTimeout(function() {
      setBlock = false;
      restart();
    }, 2000);
  }

  const charBox = document.querySelector('.abc');
  charBox.addEventListener('click', function(e) {
    if (setBlock || e.target.tagName !== 'SPAN' || e.target.className !== '') {
      return;
    }
    const letter = e.target.textContent;
    const letterInfo = poleChudes.pickLetter(letter);
    if (letterInfo.length !== 0) {
      for (const letterPosition of letterInfo) {
        squares[letterPosition].textContent = letter;
        squares[letterPosition].classList.add('revealed');
      }
      e.target.classList.add('green');
    } else {
      e.target.classList.add('red');
    }
  });

  const wordInput = document.getElementsByName('word')[0];
  wordInput.addEventListener('change', function() {
    const word = wordInput.value.toUpperCase();
    if (setBlock || word === '') {
      return;
    }
    if (poleChudes.tryWord(word)) {
      for (let i = 0; i < word.length; ++i) {
        squares[i].textContent = word[i];
        squares[i].classList.add('revealed');
      }
    }
    wordInput.value = '';
  });
}

startGame();

const charBox = document.querySelector('.abc');
for (let i = 0; i < alphabet.length; ++i) {
    let charButton = document.createElement("span");
    charButton.textContent = alphabet[i].toUpperCase();
    charBox.appendChild(charButton);
}