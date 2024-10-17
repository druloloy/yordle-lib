import type { LetterCountType, GuessResult, GuessWordParams, LetterSetResult, ResultType } from "../types";

/**
 * Verifies if a word exists in the word list
 * @param word - The word to verify
 * @param wordList - List of valid words
 * @returns boolean indicating if the word is valid
 */
export function verifyWord(word: string, wordList: string[]): boolean {
    return wordList.includes(word);
}

/**
 * Randomly selects a word from the word list
 * @param wordList - List of words to choose from
 * @returns A randomly selected word
 */
export function drawWord(wordList: string[]): string {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

/**
 * Counts the occurrence of each letter in a word
 * @param word - The word to analyze
 * @returns Object containing letter counts
 */
export function countLetters(word: string): LetterCountType {
    return word.split('').reduce((acc, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
    }, {} as LetterCountType);
}

/**
 * Validates if a word meets the game requirements
 * @param word - The word to validate
 * @param wordList - List of valid words
 * @param wordSize - Required length of the word
 * @throws {TypeError} If the word is invalid
 */
export function validateWord(word: string, wordList: string[], wordSize: number): void {
    if (!word || word.length !== wordSize || !verifyWord(word, wordList)) {
        throw new TypeError("Invalid word. Must be a word from the dictionary.");
    }
}

/**
 * Updates the sets of available and unavailable letters
 * @param letter - The letter to process
 * @param letterSets - Current letter sets
 * @returns Updated letter sets
 */
export function updateLetterSets(letter: string, letterSets: LetterSetResult): LetterSetResult {
    const { availableLetters, unavailableLetters } = letterSets;
    if (availableLetters.has(letter)) {
        availableLetters.delete(letter);
        unavailableLetters.add(letter);
    }
    return { availableLetters, unavailableLetters };
}

/**
 * Processes a guess and returns the result
 * @param params - Parameters for processing the guess
 * @returns Result of the guess including letter statuses
 */
export function guessWord(params: GuessWordParams): GuessResult {
    const {
        word,
        input,
        wordList,
        wordSize,
        letterCount,
        availableLetters,
        unavailableLetters,
        entries = []
    } = params;

    validateWord(input, wordList, wordSize);
    const guessWord = input.toLowerCase();
    const result: ResultType = new Array(wordSize);
    const remainingLetters = { ...letterCount };

    // First pass: Mark exact matches
    for (let i = 0; i < wordSize; i++) {
        const guessLetter = guessWord[i];
        if (guessLetter === word[i]) {
            result[i] = { [guessLetter]: "exact" };
            remainingLetters[guessLetter]--;
        }
    }

    // Second pass: Mark exists or wrong
    for (let i = 0; i < wordSize; i++) {
        if (result[i]) continue;
        const guessLetter = guessWord[i];
        
        if (remainingLetters[guessLetter] > 0) {
            result[i] = { [guessLetter]: "exists" };
            remainingLetters[guessLetter]--;
        } else {
            result[i] = { [guessLetter]: "wrong" };
            const letterSets = updateLetterSets(guessLetter, { availableLetters, unavailableLetters });
            Object.assign({ availableLetters, unavailableLetters }, letterSets);
        }
    }

    entries.push(result);
    return { result, availableLetters, unavailableLetters, entries };
}