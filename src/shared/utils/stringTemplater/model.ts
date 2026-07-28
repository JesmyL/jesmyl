type DefEnd = ';' | ' ' | '{' | '}';
type End = DefEnd | '\n' | '(' | ')' | '&' | '!' | '"' | '-' | '<' | '>' | '?';

export type StringTemplaterInterpolation<
  Name extends string,
  E extends End = DefEnd,
> = `${string}${`$${Name}${E}${string | ''}` | `$${Name}`}`;

export type StringTemplaterWithTwoInterpolations<Name1 extends string, Name2 extends string, E extends End = DefEnd> =
  | `${StringTemplaterInterpolation<Name1, E> | ''}${StringTemplaterInterpolation<Name2, E>}`
  | `${StringTemplaterInterpolation<Name2, E> | ''}${StringTemplaterInterpolation<Name1, E>}`;
