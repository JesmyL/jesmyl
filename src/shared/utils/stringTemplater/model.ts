type DefEnd = ';' | ' ' | '{' | '}' | '-';

export type VarKey = `$${string}${string}`;

declare const stringTemplaterValsMeta: unique symbol;
declare const stringTemplaterGenKeyMeta: unique symbol;

type StringTemplaterMeta<Vals extends object, GenKey extends string> = {
  readonly [stringTemplaterValsMeta]?: (vals: Vals) => void;
  readonly [stringTemplaterGenKeyMeta]?: GenKey;
};

type StringTemplaterInterpolationTail<Keys extends string, GenKey extends string> = [Keys] extends [never]
  ? string
  : {
      [Key in Keys]:
        | `${GenKey | ''}$${Key}${DefEnd}${StringTemplaterInterpolationTail<Exclude<Keys, Key>, GenKey>}`
        | ([Exclude<Keys, Key>] extends [never] ? `${GenKey}$${Key}` : never);
    }[Keys];

type UnionToIntersection<Union> = (Union extends unknown ? (arg: Union) => void : never) extends (
  arg: infer Intersection,
) => void
  ? Intersection
  : never;

type StringTemplaterLastKey<Keys extends string> = UnionToIntersection<
  Keys extends unknown ? (arg: Keys) => void : never
> extends (arg: infer Key) => void
  ? Key
  : never;

type StringTemplaterKeysWithin3<Keys extends string, Acc extends readonly unknown[] = []> = [Keys] extends [never]
  ? true
  : Acc['length'] extends 3
    ? false
    : StringTemplaterKeysWithin3<Exclude<Keys, StringTemplaterLastKey<Keys>>, [...Acc, unknown]>;

// Enumerating every placeholder order grows factorially: from 4 keys on its union is big enough
// to exhaust the checker, so such values are checked by presence of each placeholder instead.
type StringTemplaterInterpolationLooseTail<Keys extends string> = [Keys] extends [never]
  ? unknown
  : `${string}$${StringTemplaterLastKey<Keys> & string}${string}` &
      StringTemplaterInterpolationLooseTail<Exclude<Keys, StringTemplaterLastKey<Keys>>>;

export type StringTemplaterInterpolation<Vals extends object, GenKey extends string = string> =
  (StringTemplaterKeysWithin3<keyof Vals & string> extends true
    ? StringTemplaterInterpolationTail<keyof Vals & string, GenKey>
    : StringTemplaterInterpolationLooseTail<keyof Vals & string>) extends infer Tail
    ? Tail extends string
      ? Tail & StringTemplaterMeta<Vals, GenKey>
      : never
    : never;

export type StringTemplaterVals<Str> = [Str] extends [
  { readonly [stringTemplaterValsMeta]?: (vals: infer Vals) => void },
]
  ? Vals
  : never;

export type StringTemplaterGenKey<Str> = [Str] extends [{ readonly [stringTemplaterGenKeyMeta]?: infer GenKey }]
  ? GenKey extends string
    ? GenKey
    : string
  : string;
