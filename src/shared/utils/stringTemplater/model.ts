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

export type StringTemplaterInterpolation<Vals extends object, GenKey extends string = string> =
  StringTemplaterInterpolationTail<keyof Vals & string, GenKey> extends infer Tail
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
