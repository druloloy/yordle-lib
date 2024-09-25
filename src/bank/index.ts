import source from './words.json'

class WordBank implements StaticImplements<IWordBankStatic, typeof WordBank> {
  /**
   * Get a random word from the word bank.
   *
   * @returns a random 5-letter word
   */
  static draw() {
    const word = source[Math.floor(Math.random() * source.length)]
    return word
  }

  /**
   * Check if a word exists in the word bank.
   *
   * @param word - a 5-letter word
   * @returns true if the word exists in the word bank, false otherwise
   */
  static verify(word: string) {
    return source.includes(word)
  }
}
export default WordBank