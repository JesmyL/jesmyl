import { knownStameskaIconNames } from 'shared/values/index/known-icons';

enum NotANumber {
  nan = 'NaN',
}

declare global {
  type num = 0 | 1;
  type str = '' | '1';
  type nil = null | undefined;
  type und = undefined;
  type TimeOut = ReturnType<typeof setTimeout> | und | number;
  type intStr = `${'-' | ''}${number}`;
  type doubleStr = `${'-' | ''}${intStr}.${number}`;
  type numberStr = `${'-' | ''}${intStr}${`.${number}` | ''}`;
  type StringBySlash = `${string}/${string}`;
  type func = (arg: unknown, ...args: unknown[]) => unknown | void;

  type KRecord<Key extends string | number, Value> = (Record<`${Key}`, Value> | Record<Key, Value>) &
    Record<`${Key}` | Key, Value>;
  type PRecord<Key extends string | number, Value> = Partial<KRecord<Key, Value>>;

  /** Record with <Required key, Partial key, Value> */
  type RPRecord<ReqiredKey extends string | number, Key extends string | number, Value> = KRecord<ReqiredKey, Value> &
    Partial<KRecord<Exclude<Key, ReqiredKey>, Value>>;

  type RKey<Key extends number> = Key | `${Key}`;

  type OmitOwn<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  type WithRewrites<T, P> = Pick<T, Exclude<keyof T, keyof P>> & Pick<P, keyof P>;

  type NaN = NotANumber;
  type NaNumber = number | NotANumber;
  type FalsyValue = false | '' | 0 | nil;

  type PropagationStopperEvent = { stopPropagation(): void };
  type PropagationStopper = (event: PropagationStopperEvent) => void;

  type DefaultPreventerEvent = { preventDefault(): void };
  type DefaultPreventer = (event: DefaultPreventerEvent) => void;

  type PreventerAndStopperCallback = (event: DefaultPreventerEvent & PropagationStopperEvent) => void;

  type NonUndefined<T> = T extends undefined ? never : T;
  type NonNull<T> = T extends null ? never : T;
  type NonNil<T> = T extends nil ? never : T;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

  type KnownStameskaIconName = keyof typeof knownStameskaIconNames;

  interface String {
    startsWith<Text extends string>(this: string, text: Text): this is `${Text}${string}`;
    endsWith<Text extends string>(this: string, text: Text): this is `${string}${Text}`;
    includes<Text extends string>(this: string, text: Text): this is `${string}${Text}${string}`;
    repeat<Count extends number, Text extends string>(this: Text, count: Count): CountRepeatTextRecord<Text>[Count];
  }
}

type CountRepeatTextRecord<T extends string> = Record<number, `${T}${string}`> & {
  0: '';
  1: T;
  2: `${T}${T}`;
  3: `${T}${T}${T}`;
  4: `${T}${T}${T}${T}`;
  5: `${T}${T}${T}${T}${T}`;
};
