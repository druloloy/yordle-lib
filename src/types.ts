/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

export interface IYordle {
  entries: ResultType[];
  availableLetters: Set<string>;
  unavailableLetters: Set<string>;
  guess: (input: string) => ResultType;
  loadEntries: (entries: ResultType[]) => void;
}

type IWordBank = object

export interface IWordBankStatic {
    new (...args: unknown[]): IWordBank;
    draw: () => string;
    verify: (word: string) => boolean;
}

export type StaticImplements<I extends new (...args: unknown[]) => unknown, _C extends I> = InstanceType<I>;