/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
export declare type MatchType = 
  | 'exact' 
  | 'exists' 
  | 'wrong';

export declare type ResultType = Array<{
  [letter: string]: MatchType
}>

export declare type LetterCountType = {
  [letter: string]: number
} | object

export declare interface IYordle {
  guess: (input: string) => ResultType;
}

type IWordBank = object

export declare interface IWordBankStatic {
    new (...args: unknown[]): IWordBank;
    draw: () => string;
    verify: (word: string) => boolean;
}

export declare type StaticImplements<I extends new (...args: unknown[]) => unknown, _C extends I> = InstanceType<I>;