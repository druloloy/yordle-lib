# Yordle

[![npm version](https://img.shields.io/npm/v/yordle.svg)](https://www.npmjs.com/package/yordle)
[![npm downloads](https://img.shields.io/npm/dm/yordle.svg)](https://www.npmjs.com/package/yordle)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for creating Wordle-like word guessing games. Yordle provides a flexible and type-safe way to implement word guessing mechanics in your projects.

## Features

- 🎯 Full TypeScript support with comprehensive type definitions
- 🎲 Built-in word list with option to use custom words
- 🔄 Random word generation
- ✅ Word verification
- 📊 Detailed guess feedback system
- 🎮 Game state management
- 💾 Progress tracking

## Installation

```bash
npm install yordle
# or
yarn add yordle
# or
pnpm add yordle
```

## Quick Start

```typescript
import yordle from 'yordle';

// Initialize the game
const game = yordle({
  word: 'hello',    // Target word
  wordSize: 5,      // Word length
  // Optional parameters
  wordList: ['hello', 'world'], // Custom word list
  entries: []       // Previous game entries
});

// Make a guess
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

## API Reference

### `yordle(props: YordleProps)`

Main function to initialize the game controller.

#### Props

```typescript
type YordleProps = {
  word: string;           // Target word to be guessed
  wordSize: number;       // Length of the word
  wordList?: string[];    // Optional custom word list (Defaults to a 5-letter word list)
  entries?: ResultType[]; // Optional previous game entries
}
```

#### Returns

Object containing the following methods:

##### `guess(input: string): ResultType`

Makes a guess with the provided input word and returns the result.

- **Parameters:**
  - `input`: The word guessed by the player
- **Returns:** Array of objects containing letter matches:
  - `'exact'`: Letter is in correct position
  - `'exists'`: Letter exists in word but wrong position
  - `'wrong'`: Letter does not exist in word

```typescript
const result = game.guess('spark');
// Example output:
// [
//   { s: 'wrong' },
//   { p: 'exists' },
//   { a: 'wrong' },
//   { r: 'exact' },
//   { k: 'wrong' }
// ]
```

##### `draw(overwrite?: boolean): string`

Returns a random word from the word list.

- **Parameters:**
  - `overwrite`: If true, replaces the current target word (default: false)
- **Returns:** A random word from the word list

```typescript
const newWord = game.draw();        // Get random word
const newTarget = game.draw(true);  // Get and set new target word
```

##### `verify(input: string): boolean`

Verifies if a word exists in the word list.

- **Parameters:**
  - `input`: Word to verify
- **Returns:** Boolean indicating if the word is valid

```typescript
const isValid = game.verify('hello'); // true
```

## Types

```typescript
type MatchType = 'exact' | 'exists' | 'wrong';

type ResultType = Array<{
  [letter: string]: MatchType
}>;

type LetterCountType = {
  [letter: string]: number
} | object;
```

## Example Usage

### Basic Game Implementation

```typescript
import yordle from 'yordle';

// Initialize game
const game = yordle({
  word: 'clear',
  wordSize: 5
});

// Process player guess
function handleGuess(playerInput: string) {
  if (!game.verify(playerInput)) {
    console.log('Invalid word!');
    return;
  }

  const result = game.guess(playerInput);
  
  // Check for win condition
  const isWin = result.every(letterResult => 
    Object.values(letterResult)[0] === 'exact'
  );

  if (isWin) {
    console.log('Congratulations!');
  }

  return result;
}
```

### Custom Word List

```typescript
const customGame = yordle({
  word: 'code',
  wordSize: 4,
  wordList: ['code', 'java', 'rust', 'ruby', 'perl'],
});
```

## License

MIT © [Your Name]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request