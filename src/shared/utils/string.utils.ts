export const textToUpperCase = <Str extends string>(text: Str) => text.toUpperCase() as Uppercase<Str>;
export const textToLowerCase = <Str extends string>(text: Str) => text.toLowerCase() as Lowercase<Str>;
export const textToCapitalizeCase = <Str extends string>(text: Str) =>
  ((text[0]?.toUpperCase() ?? '') + text.slice(1)) as Capitalize<Str>;
