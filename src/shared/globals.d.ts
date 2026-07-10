import { knownStameskaIconNames } from 'shared/values/index/known-icons';
import { Bool as BoolType } from './enums';

enum NotANumber {
  nan = 'NaN',
}

declare global {
  type num = 0 | 1;
  type Bool = BoolType;
  type nil = null | undefined;
  type und = undefined;
  type TimeOut = ReturnType<typeof setTimeout> | und | number;

  type KRecord<Key extends string | number, Value> = (Record<`${Key}`, Value> | Record<Key, Value>) &
    Record<`${Key}` | Key, Value>;
  type PRecord<Key extends string | number, Value> = Partial<KRecord<Key, Value>>;

  /** Record with <Required key, Partial key, Value> */
  type RPRecord<ReqiredKey extends string | number, Key extends string | number, Value> = KRecord<ReqiredKey, Value> &
    Partial<KRecord<Exclude<Key, ReqiredKey>, Value>>;

  type RKey<Key extends number | string> = Key | `${Key}`;

  type OmitOwn<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type NaN = NotANumber;
  type NaNumber = number | NotANumber;
  type FalsyValue = false | '' | 0 | nil;

  type PropagationStopperEvent = { stopPropagation(): void };
  type PropagationStopper = (event: PropagationStopperEvent) => void;

  type DefaultPreventerEvent = { preventDefault(): void };
  type DefaultPreventer = (event: DefaultPreventerEvent) => void;

  type PreventerAndStopperCallback = (event: DefaultPreventerEvent & PropagationStopperEvent) => void;

  /** @deprecated */
  type NonUndefined<T> = T extends undefined ? never : T;

  type NullifyOptionals<T> = { [K in keyof T]: und extends T[K] ? T[K] | nil : T[K] };

  type PromiseOr<T> = T | Promise<T>;

  type KnownStameskaIconName = keyof typeof knownStameskaIconNames;
}
