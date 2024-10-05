import WordBank from "../bank";
import { IYordle, LetterCountType, ResultType } from "../types";

/**
 * A class that represents a Yordle, a game of guessing a 5-letter word.
 * @class Yordle
 * @implements {IYordle}
 */
class Yordle implements IYordle {
    private letterCount: LetterCountType;
    private word: string;
    public entries: ResultType[] = [];
    public availableLetters: Set<string> = new Set('abcdefghijklmnopqrstuvwxyz');
    public unavailableLetters: Set<string> = new Set();

    /**
     * Create a new Yordle instance with the given 5-letter word.
     * @param {string} input - the 5-letter word to be guessed.
     * @throws {TypeError} If the word is empty, not 5 letters long, or not in the dictionary.
     */
    constructor(input: string) {
        this.validateWord(input);
        this.word = input.toLowerCase();
        this.letterCount = this.countLetters(this.word);
    }

    /**
     * Load a list of entries into the current game, and remove all unavailable letters from the set of available letters.
     * @param {ResultType[]} entries - The list of entries to load.
     */
    loadEntries(entries: ResultType[]) {
      this.entries = entries;

      // Remove unavailable letters from the set of available letters
      for (const entry of entries) {
        for (const item of entry) {
          const [key, value] = Object.entries(item)[0];
          if (value === 'wrong') {
            this.removeAvailableLetter(key);
          }
        }
      }
    }

    /**
     * Make a guess with the given 5-letter word.
     * @param {string} inputWord - The 5-letter word to be guessed.
     * @returns {ResultType} An array of objects, each representing the result of a letter match.
     *   - "exact" if the letter is in the correct position,
     *   - "exists" if the letter exists in the word but not in the correct position,
     *   - "wrong" if the letter does not exist in the word.
     * @throws {TypeError} If the word is empty, not 5 letters long, or not in the dictionary.
     */
    guess(inputWord: string): ResultType {
      this.validateWord(inputWord);
      const guessWord = inputWord.toLowerCase();
      const result: ResultType = new Array(5);
      const remainingLetters = { ...this.letterCount };

      // First pass: Mark exact matches
      for (let i = 0; i < 5; i++) {
          const guessLetter = guessWord[i];
          if (guessLetter === this.word[i]) {
              result[i] = { [guessLetter]: "exact" };
              remainingLetters[guessLetter]--;
          }
      }

      // Second pass: Mark exists or wrong
      for (let i = 0; i < 5; i++) {
          if (result[i]) continue; // Skip already marked positions

          const guessLetter = guessWord[i];
          if (remainingLetters[guessLetter] > 0) {
              result[i] = { [guessLetter]: "exists" };
              remainingLetters[guessLetter]--;
          } else {
              result[i] = { [guessLetter]: "wrong" };
              this.removeAvailableLetter(guessLetter);
          }
      }

      this.entries.push(result);
      return result;
    }

    /**
     * Validates the given word against the following conditions:
     *  - The word is not empty.
     *  - The word is 5 letters long.
     *  - The word is in the dictionary (WordBank).
     * @param {string} word - The word to be validated.
     * @throws {TypeError} If the word fails to satisfy any of the above conditions.
     * @private
     */
    private validateWord(word: string) {
        if (!word || word.length !== 5 || !WordBank.verify(word)) {
            throw new TypeError("Invalid word. Must be a 5-letter word from the dictionary.");
        }
    }
    
    /**
     * Count the occurrences of each letter in the given word.
     * @param {string} word - The word to count letters for.
     * @returns {LetterCountType} An object with each letter as a key and its count as the value.
     * @private
     */
    private countLetters(word: string): LetterCountType {
        return word.split('').reduce((acc, letter) => {
            acc[letter] = (acc[letter] || 0) + 1;
            return acc;
        }, {} as LetterCountType);
    }

    /**
     * Remove a letter from the set of available letters and add it to the set of unavailable letters.
     * @param {string} letter - The letter to remove from the set of available letters.
     * @private
     */
    private removeAvailableLetter(letter: string) {
        if (this.availableLetters.has(letter)) {
            this.availableLetters.delete(letter);
            this.unavailableLetters.add(letter);
        }
    }
}

export default Yordle;