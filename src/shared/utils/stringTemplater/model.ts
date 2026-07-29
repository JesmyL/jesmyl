type DefEnd = ';' | ' ' | '{' | '}' | '-';
type End = DefEnd | '\n' | '(' | ')' | '&' | '!' | '"' | '<' | '>' | '?';

export type StringTemplaterInterpolation<
  Name extends string,
  E extends End = DefEnd,
> = StringTemplaterInterpolationInner<Name, E | DefEnd>;

export type StringTemplaterWithTwoInterpolations<
  Name1 extends string,
  Name2 extends string,
  E extends End = DefEnd,
> = StringTemplaterWithTwoInterpolationsInner<Name1, Name2, E | DefEnd>;

/////////
/////////
/////////

type StringTemplaterInterpolationInner<
  Name extends string,
  E extends End = DefEnd,
> = `${string}${`$${Name}${E}${string | ''}` | `$${Name}`}`;

type StringTemplaterWithTwoInterpolationsInner<Name1 extends string, Name2 extends string, E extends End = DefEnd> =
  | `${StringTemplaterInterpolationInner<Name1, E> | ''}${StringTemplaterInterpolationInner<Name2, E>}`
  | `${StringTemplaterInterpolationInner<Name2, E> | ''}${StringTemplaterInterpolationInner<Name1, E>}`;
