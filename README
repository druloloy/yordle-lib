# Yordle Library

Yordle is a TypeScript library for creating and playing a word-guessing game similar to Wordle. It provides functionality for managing the game state, validating guesses, and interacting with a word bank.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating a Yordle Game](#creating-a-yordle-game)
  - [Making a Guess](#making-a-guess)
  - [Using the Word Bank](#using-the-word-bank)
- [API Reference](#api-reference)
  - [Yordle Class](#yordle-class)
  - [WordBank Class](#wordbank-class)
- [Types](#types)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the Yordle Library, use npm:

```bash
yarn add yordle-lib@https://github.com/druloloy/yordle-lib.git
```

## Usage

First, import the `Yordle` and `WordBank` classes:

```typescript
import { Yordle, WordBank } from 'yordle-lib';
```

### Creating a Yordle Game

To start a new game, create a new `Yordle` instance with a 5-letter word:

```typescript
const game = new Yordle('hello');
```

Or use the `WordBank` to get a random word:

```typescript
const randomWord = WordBank.draw();
const game = new Yordle(randomWord);
```

### Making a Guess

To make a guess in the game:

```typescript
const result = game.guess('world');
console.log(result);
// Output: [
//   { w: 'wrong' },
//   { o: 'exists' },
//   { r: 'wrong' },
//   { l: 'exact' },
//   { d: 'wrong' }
// ]
```

### Using the Word Bank

To check if a word exists in the word bank:

```typescript
const exists = WordBank.verify('hello');
console.log(exists); // true or false
```

To get a random word from the word bank:

```typescript
const randomWord = WordBank.draw();
console.log(randomWord); // A random 5-letter word
```

## API Reference

### Yordle Class

#### Constructor

```typescript
constructor(input: string)
```

Creates a new Yordle game instance with the given word.

- `input`: A 5-letter word to be guessed.

Throws a `TypeError` if:
- The word is empty
- The word is not 5 letters long
- The word doesn't exist in the dictionary (WordBank)

#### Methods

##### `guess(inputWord: string): ResultType`

Makes a guess and returns the result.

- `inputWord`: A 5-letter word guess.
- Returns: An array of objects representing the result of each letter.

### WordBank Class

#### Static Methods

##### `draw(): string`

Returns a random 5-letter word from the word bank.

##### `verify(word: string): boolean`

Checks if a word exists in the word bank.

- `word`: A 5-letter word to verify.
- Returns: `true` if the word exists in the word bank, `false` otherwise.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).