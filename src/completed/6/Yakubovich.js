
const RUS = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

export class Yakubovich {
  constructor() {
    this.history = new Map();
    this.score = 0;
    this.completed = 0;
    this.revealedLetters = [];
    this.onguessed = null;
  }

  async init(abc = RUS) {
    this.loadDictionary();
    this.setAlphabet(abc)
    this._newQuestion();;
  }

  async loadDictionary() {
    const response = await fetch('dictionary.json');
    const dict = await response.json();
    this.dictionary = new Map(dict);
  }

  setAlphabet(abc) {
    if (typeof this.alphabet === 'string') {
      this.alphabet = abc;
      return true;
    } else {
      return false;
    }
  }

  _newQuestion() {
    this.revealedLetters = [];
    const remainingQuestionsCount = this.dictionary.keys.length;
    const randomQuestionIndex = Math.floor(remainingQuestionsCount * Math.random());
    const randomAnswer = this.dictionary.keys[randomQuestionIndex];
    this._answer = randomAnswer;
  }

  get numberOfLetters() {
    return this._answer.length;
  }

  get question() {
    return this.dictionary.get(this._answer);
  }

  _guessed() {
    this.history.set(this._answer, this.question);
    this.dictionary.delete(this._answer);
    this.completed++;
    this._newQuestion();
    if (this.onguessed) {
      setTimeout(this.onguessed());
    }
  }

  pickLetter(letter) {
    const guessedLetters = [];
    if (this.revealedLetters.includes(letter)) {
      return guessedLetters;
    }
    for (let i = 0; i < this._answer.length; i++) {
      if (this._answer[i] === letter) {
        guessedLetters.push(i);
        this.revealedLetters.push(this._answer[i]);
      }
    }
    if (this.revealedLetters.length === this._answer.length) {
      this._guessed();
    }
    return guessedLetters;
  }

  guessWord(word) {
    if (word === this._answer) {
      this._guessed();
      return true;
    } else {
      return false;
    }
  }

}