export type MatchType = 
  | 'exact' 
  | 'exists' 
  | 'wrong';

export type ResultType = Array<{
  [letter: string]: MatchType
}>

export type LetterCountType = {
  [letter: string]: number
} | object

export type YordleProps = {
  word: string;
  wordSize: number;
  wordList?: string[];
  entries?: ResultType[];
}

export type GuessWordParams = {
  word: string;
  input: string;
  wordList: string[];
  wordSize: number;
  letterCount: LetterCountType;
  availableLetters: Set<string>;
  unavailableLetters: Set<string>;
  entries?: ResultType[];
}

export type GuessResult = {
  result: ResultType;
  availableLetters: Set<string>;
  unavailableLetters: Set<string>;
  entries: ResultType[];
}

export type LetterSetResult = {
  availableLetters: Set<string>;
  unavailableLetters: Set<string>;
}