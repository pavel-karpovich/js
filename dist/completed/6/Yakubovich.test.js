
import {Yakubovich} from './Yakubovich.js';
import { stringLiteral } from '@babel/types';

describe('Testing constructor and initialization process', () => {

  test('Constructors works', () => {
    const yakub = new Yakubovich();
    expect(yakub).toBeDefined();
  });

  test('Alphabet correctly assigned', () => {
    const numberAlphabet = '0123456789';
    const yakub = new Yakubovich();
    yakub._setAlphabet(numberAlphabet);
    expect(yakub.alphabet).toBe(numberAlphabet);
  });

  test('Incorrect alphabet', () => {
    const notReallyAlphabet = {a: 'b', c: 'd'};
    const yakub = new Yakubovich();
    expect(() => yakub._setAlphabet(notReallyAlphabet)).toThrow();
  })

  describe('Testing different dictionaries', () => {
    
    let yakub = null;

    beforeEach(() => {
      const numberAlphabet = '0123456789';
      yakub = new Yakubovich();
      yakub._setAlphabet(numberAlphabet);
    });

    test('Correct dictionary using object', () => {
      const QnA = {
        '42': 'Answer to the Ultimate Question of Life, the Universe, and Everything',
        '1': 'The Sinus of 90 degrees',
        '13772000000': 'Age of the Universe in years'
      };
      const expected = new Map(Object.entries(QnA));
      yakub._setDictionary(QnA);
      expect(yakub.dictionary).toEqual(expected);
    });

    test('Correct dictionary using Map', () => {
      const QnA = {
        '42': 'Answer to the Ultimate Question of Life, the Universe, and Everything',
        '1': 'The Sinus of 90 degrees',
        '13772000000': 'Age of the Universe in years'
      };
      const expected = new Map(Object.entries(QnA));
      yakub._setDictionary(expected);
      expect(yakub.dictionary).toEqual(expected);
    });
  
    test('Incorrect dictionary', () => {
      const incorrectDict = "String. Why string?";
      expect(() => yakub._setDictionary(incorrectDict)).toThrow();
    });

    test('Answers don\'t match the alphabet', () => {
      const QnA = {
        '42342': 'Answer to the Ultimate Question of Life, the Universe, and Everything',
        'dawdawd': 'The Sinus of 90 degrees',
        'f222e': 'Age of the Universe in years'
      };
      const expected = new Map(Object.entries(QnA));
      expect(() => yakub._setDictionary(expected)).toThrow();
    });
  });

  test('Choosing question and answer are working', () => {
    const numberAlphabet = '01';
    const QnA = {'110': '6', '101': '5'};
    const choices = ['110', '101'];
    const yakub = new Yakubovich();
    yakub._setAlphabet(numberAlphabet);
    yakub._setDictionary(QnA);
    yakub._newQuestion();
    expect(choices).toContain(yakub._answer);
  });
});

const engDict = {
  'word': 'riddle',
  'twowords': 'really big and long riddle',
  'abcdefghi': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, tempora veritatis quaerat ipsum'
}
const engAbc = 'abcdefghijklmnopqrstuvwxyz';
const engChoosenWord = 'twowords';
const rusDict = {
  'слово': 'загадка',
  'длинноеслово': 'довольно длинная и очень оригинальная загадка',
  'абвгдейжзийклм': 'С большой долей вероятности мы можем сказать, что исходя из прибыли за прошедший квартал, ситуация'
}
const rusAbc = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const rusChoosenWord = 'длинноеслово';

describe.each([
  [engAbc, engDict, engChoosenWord],
  [rusAbc, rusDict, rusChoosenWord]
])('Test main functionality for russian and english languages', (abc, dict, choosen) => {

  let poleChudes = null;

  beforeEach(() => {
    poleChudes = new Yakubovich();
    poleChudes._newQuestion = jest.fn(function() {
      this.revealedLetters = [];
      this._answer = choosen.toUpperCase();
    });
    poleChudes.start(abc, dict);
  });

  test('Existing letter in lower case', () => {
    const randomLetterIndex = Math.floor(Math.random() * choosen.length);
    const letter = choosen[randomLetterIndex];
    const isExist = poleChudes.pickLetter(letter);
    expect(isExist).not.toEqual([]);
  });

  test('Existing letter in upper case', () => {
    const randomLetterIndex = Math.floor(Math.random() * choosen.length);
    const letter = choosen[randomLetterIndex].toUpperCase();
    const isExist = poleChudes.pickLetter(letter);
    expect(isExist).not.toEqual([]);
  });

  test('open letter that doesn\'t exist', () => {
    const letter = [].find.call(poleChudes.alphabet, (val) => !choosen.includes(val));
    const isExist = poleChudes.pickLetter(letter);
    expect(isExist).toEqual([]);
  });

  test('attempt to use a letter does not match the alphabet', () => {
    const letter = '😅';
    expect(() => poleChudes.pickLetter(letter)).toThrow();
  });

  test('cyclic picking of one letter does not cause complete guessing', () => {
    const randomLetterIndex = Math.floor(Math.random() * choosen.length);
    const letter = choosen[randomLetterIndex];
    poleChudes._guessed = jest.spyOn(poleChudes, '_guessed');
    for (let i = 0; i < 20; ++i) {
      poleChudes.pickLetter(letter);
    }
    expect(poleChudes._guessed).not.toBeCalled();
  });

  test('picking the last letter causes a new word choosing', () => {
    const allLetters = Array.from(choosen);
    const lastLetter = allLetters.shift();
    poleChudes.revealedLetters = allLetters;
    poleChudes._guessed = jest.spyOn(poleChudes, '_guessed');
    poleChudes.pickLetter(lastLetter);
    expect(poleChudes._guessed).toHaveBeenCalledTimes(1);
  });

  test('Guessed word removed from the dictionary', () => {
    poleChudes._guessed();
    expect(poleChudes.dictionary).not.toContain(choosen);
  });

  test('Guessed word added to the history', () => {
    const expectedHistory = choosen.toUpperCase();
    poleChudes._guessed();
    const answerHistory = Array.from(poleChudes.history.keys());
    expect(answerHistory).toContain(expectedHistory);
  });

  test('Callback onGuessed is called', done => {
    poleChudes.onguessed = () => done();
    poleChudes._guessed();
  });

  test('Successful word guessing (lower case)', () => {
    poleChudes._guessed = jest.spyOn(poleChudes, '_guessed');
    poleChudes.tryWord(choosen);
    expect(poleChudes._guessed).toBeCalledTimes(1);
  });
  
  test('Successful word guessing (random case)', () => {
    const correctWord = String.fromCharCode(null, [].map.call(choosen, (val, ind) => ind % 2 ? val : val.toUpperCase()));
    poleChudes._guessed = jest.spyOn(poleChudes, '_guessed');
    poleChudes.tryWord(correctWord);
    expect(poleChudes._guessed).not.toBeCalled();
  });

  test('Unsuccessful word guessing', () => {
    const notCorrectWord = 'bsd832ahc';
    poleChudes._guessed = jest.spyOn(poleChudes, '_guessed');
    poleChudes.tryWord(notCorrectWord);
    expect(poleChudes._guessed).not.toBeCalled();
  });

  test('Get number of letters', () => {
    const expectedNumber = choosen.length;
    const actualNumber = poleChudes.numberOfLetters;
    expect(expectedNumber).toBe(actualNumber);
  });

  test('Get question', () => {
    const expectedQuestion = dict[choosen];
    const actualQuestion = poleChudes.question;
    expect(actualQuestion).toBe(expectedQuestion);
  });
});

describe('Uninitialized instance', () => {

  test('Can\'t get number of letters', () => {
    const yakub = new Yakubovich();
    expect(() => yakub.numberOfLetters).toThrow();
  });

  test('Can\'t get question', () => {
    const yakub = new Yakubovich();
    expect(() => yakub.question).toThrow();
  });

  test('Can\'t pick letter', () => {
    const yakub = new Yakubovich();
    expect(() => yakub.pickLetter('q')).toThrow();
  });

  test('Can\'t guessing a whole word', () => {
    const yakub = new Yakubovich();
    expect(() => yakub.tryWord('snfonsef3')).toThrow();
  });
});