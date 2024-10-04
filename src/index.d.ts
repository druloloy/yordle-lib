declare type MatchType = 
  | 'exact' 
  | 'exists' 
  | 'wrong';

declare type ResultType = Array<{
  [letter: string]: MatchType
}>

declare type LetterCountType = {
  [letter: string]: number
} | object

declare interface IYordle {
  guess: (input: string) => ResultType;
}

type IWordBank = object

declare interface IWordBankStatic {
    new (...args: unknown[]): IWordBank;
    draw: () => string;
    verify: (word: string) => boolean;
}

declare type StaticImplements<I extends new (...args: unknown[]) => unknown, C extends I> = InstanceType<I>;