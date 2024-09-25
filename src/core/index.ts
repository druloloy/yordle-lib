import WordBank from "../bank";

/**
 * A class that represents a Yordle, a game of guessing a 5-letter word.
 * @class Yordle
 * @implements {IYordle}
 */
class Yordle implements IYordle {
    letterCount: LetterCountType;
    word: string;
  
    /**
     * Initialize the Yordle object with a word.
     * @param {string} inputWord The word to be used as the Yordle word
     */
    constructor(input: string) {
      this.validateWord(input);
      this.word = input.toLowerCase();
      // Count the letters in the word
      this.letterCount = this.countLetters(input);
    }
  
    
    /**
     * Validate the given word to ensure it is a 5-letter word.
     * @param {string} word - The word to be validated
     * @throws {TypeError} - If the word is empty or not 5 letters long
     */
    private validateWord(word: string) {
      if (!word) {
        throw new TypeError("Assign a 5-letter word to guess.");
      }
      if (word.length !== 5) {
        throw new TypeError("Word must have 5 letters only.");
      }
      if (!WordBank.verify(word)) {
        throw new TypeError("Word doesn't exist in the dictionary.");
      }
    }
  
    /**
     * Compares the given guess word with the Yordle word.
     * @param {string} inputWord The guess word
     * @returns {ResultType} An array of objects with letter as key and
     * the value will be either 'exact', 'exists' or 'wrong' depending on the
     * position and existence of the letter in the Yordle word.
     */
    guess(inputWord: string): ResultType {
      this.validateWord(inputWord);
      const guessWord = inputWord.toLowerCase();
  
      // Count the letters that exist in the word
      const existCounter: LetterCountType = {};
      // Count the letters that are in the exact position
      const exactCounter: LetterCountType = {};
      // The results of the guess
      let results = guessWord.split('').map((letter, index) => {
        const correctLetter: string = this.word[index];
  
        if (letter === correctLetter) {
          exactCounter[letter] = (exactCounter[letter] || 0) + 1;
          return { [letter]: "exact" };
        } else if (this.word.includes(letter)) {
          existCounter[letter] = (existCounter[letter] || 0) + 1;
          return { [letter]: "exists" };
        } else {
          return { [letter]: "wrong" };
        }
      });
  
      // Recheck the results and correct the existing letters based on the exact count
      results = this.recheck(results as ResultType, exactCounter)
  
      return results as ResultType;
    }
  
    
    /**
     * Rechecks the results of the guess and corrects the existing letters
     * based on the exact count.
     * @param {ResultType} results - The results of the guess
     * @param {LetterCountType} exact - The count of letters that are in the exact position
     * @returns {ResultType} - The corrected results
     */
    private recheck(results: ResultType, exact: LetterCountType): ResultType {
      return results.map((result) => {
        const letter = Object.keys(result)[0];
  
        // If the letter is marked as existing and the exact count of the letter
        // is equal to the total count of the letter, then the letter is not
        // in the correct position, so mark it as wrong
        if (result[letter] === 'exists' && exact[letter] === this.letterCount[letter]) {
          result[letter] = 'wrong';
        }
        return result;
      });
    }
  
    
    /**
     * Count the letters in a word
     * @param {string} word - The word to count the letters in
     * @returns {LetterCountType} - An object with the letter as the key and the count as the value
     */
    private countLetters(word: string): LetterCountType {
      return word.split('').reduce((acc, letter) => {
        // If the letter is already in the object, increment the count, otherwise add it with a count of 1
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      }, {} as LetterCountType);
    }
  }
  
  export default Yordle