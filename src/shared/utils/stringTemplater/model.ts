type DefEnd = ';' | ' ' | '{' | '}' | '-';

export type StringTemplaterInterpolation<Name extends string, GenKey extends string = string> =
  | StringTemplaterInterpolationInner<Name, GenKey>
  | `${GenKey}$${Name}`;

export type StringTemplaterWithTwoInterpolations<
  Name1 extends string,
  Name2 extends string,
  GenKey extends string = string,
> = StringTemplaterWithTwoInterpolationsInner<Name1, Name2, GenKey>;

/////////
/////////
/////////

type StringTemplaterInterpolationInner<
  Name extends string,
  GenKey extends string,
> = `${GenKey | ''}$${Name}${DefEnd}${string}`;

type StringTemplaterWithTwoInterpolationsInner<Name1 extends string, Name2 extends string, GenKey extends string> =
  | `${StringTemplaterInterpolationInner<Name1, GenKey>}${StringTemplaterInterpolationInner<Name2, GenKey> | `${GenKey | ''}$${Name1 | Name2}`}`
  | `${StringTemplaterInterpolationInner<Name2, GenKey>}${StringTemplaterInterpolationInner<Name1, GenKey> | `${GenKey | ''}$${Name1 | Name2}`}`;
