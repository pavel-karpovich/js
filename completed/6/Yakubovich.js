
export class Yakubovich {
  constructor(abc, dict) {
    this.history = new Map();
    this.score = 0;
    this.completed = 0;
    this.revealedLetters = [];
    this.onguessed = null;
  }

  start(abc, dict) {
    this._setAlphabet(abc);
    this._setDictionary(dict);
    this._newQuestion();
  }

  _setAlphabet(abc) {
    if (typeof abc === 'string' && abc !== '') {
      this.alphabet = abc.toUpperCase();;
    } else {
      throw new Error('Alphabet is not correct.');
    }
  }

  _setDictionary(dict) {
    if (typeof dict !== 'object') {
      throw new Error('Dictionary is not correct.');
    }
    if (!(dict instanceof Map)) {
      dict = new Map(Object.entries(dict));
    }
    const keyArr = Array.from(dict.keys());
    for (const key of keyArr) {
      const upperKey = key.toUpperCase();
      if (upperKey !== key) {
        dict.set(upperKey, dict.get(key));
        dict.delete(key);
      }
    }
    const regex = new RegExp(`^[${this.alphabet}${this.alphabet.toLowerCase()}]+$`);
    for (const key of dict.keys()) {
      if (!regex.test(key)) {
        throw new Error('Dictionary is not correct.');
      }
    }
    this.dictionary = dict;
  }

  _newQuestion() {
    this.revealedLetters = [];
    const remainingQuestionsCount = this.dictionary.size;
    const randomQuestionIndex = Math.floor(Math.random() * remainingQuestionsCount);
    const items = Array.from(this.dictionary.keys());
    const randomAnswer = items[randomQuestionIndex];
    this._answer = randomAnswer;
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

  get numberOfLetters() {
    if (!this._answer) {
      throw Error('Capital-show is not init.');
    }
    return this._answer.length;
  }

  get question() {
    if (!this._answer) {
      throw Error('Capital-show is not init.');
    }
    return this.dictionary.get(this._answer);
  }

  pickLetter(letter) {
    letter = letter.toUpperCase();
    if (!this._answer) {
      throw Error('Capital-show is not init.');
    } else if (!this.alphabet.includes(letter)) {
      throw Error(`Letter ${letter} is not included in the alphabet.`);
    };
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

  tryWord(word) {
    if (!this._answer) {
      throw Error('Capital-show is not init.');
    }
    if (word.toUpperCase() === this._answer) {
      this._guessed();
      return true;
    } else {
      return false;
    }
  }
}