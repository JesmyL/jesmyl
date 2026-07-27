export type StringTemplaterInterpolation<Name extends string> = `${string}$${Name}${';' | ' ' | '{' | '}'}${string}`;

export type StringTemplaterWithTwoInterpolations<Name1 extends string, Name2 extends string> =
  | `${StringTemplaterInterpolation<Name1>}${StringTemplaterInterpolation<Name2>}`
  | `${StringTemplaterInterpolation<Name2>}${StringTemplaterInterpolation<Name1>}`;
