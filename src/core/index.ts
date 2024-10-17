import type { ResultType, YordleProps } from "../types";
import { guessWord, countLetters, drawWord, verifyWord } from "../core/lib";
import defaultWordList from "../words.json";

/**
 * Main Yordle game controller
 * @param props - Game initialization properties
 * @returns Object containing game control functions
 */
export default function yordle({ 
    word = '', 
    wordSize = 5, 
    wordList = defaultWordList, 
    entries = [] 
}: YordleProps = {}) {
    let currentWord = word || drawWord(wordList);
    let availableLetters = new Set('abcdefghijklmnopqrstuvwxyz');
    let unavailableLetters = new Set<string>();
    let letterCount = countLetters(currentWord);

    
    /**
     * Makes a guess with the provided input word and updates the game state.
     * @param {string} input - The word guessed by the player.
     * @returns {ResultType} The result of the guess, indicating the status of each letter.
     *   - "exact" if the letter is in the correct position,
     *   - "exists" if the letter exists in the word but not in the correct position,
     *   - "wrong" if the letter does not exist in the word.
     */
    const guess = (input: string): ResultType => {  
        const guessed = guessWord({
            word: currentWord,
            input,
            wordList,
            wordSize,
            entries,
            letterCount,
            availableLetters,
            unavailableLetters
        });

        ({ availableLetters, unavailableLetters, entries } = guessed);
        return guessed.result;
    };

    /**
     * Returns a random word from the word list.
     * If `overwrite` is `true`, the current word is replaced with the new random word.
     * @param {boolean} [overwrite=false] Whether to overwrite the current word
     
     * @returns {string} A random 5-letter word
     */
    const draw = (overwrite: boolean = false): string => {
        if (!overwrite) {
            return drawWord(wordList);
        }
        
        currentWord = drawWord(wordList);
        letterCount = countLetters(currentWord);
        return currentWord;
    };

    return {
        guess,
        draw,
        verify: (input: string) => verifyWord(input, wordList),
        entries,
        currentWord
    };
}