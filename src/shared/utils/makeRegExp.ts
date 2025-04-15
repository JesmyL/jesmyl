const regs: Record<string, RegExp> = {};
export type StrRegExp =
  `/${string}${string}/${'d' | ''}${'g' | ''}${'i' | ''}${'m' | ''}${'s' | ''}${'u' | ''}${'y' | ''}`;

export function makeRegExp(reg: StrRegExp, isResetLastIndex?: boolean) {
  if (regs[reg] === undefined) {
    const errorText = `Invalid arg passed in ${makeRegExp.name}(${reg})`;
    if (reg.length < 3 || !reg.startsWith('/')) throw errorText;
    try {
      regs[reg] = new RegExp(reg.slice(1, reg.lastIndexOf('/')), reg.slice(reg.lastIndexOf('/') + 1));
    } catch (_e) {
      throw errorText;
    }
  }

  if (isResetLastIndex === true) regs[reg].lastIndex = 0;

  return regs[reg];
}
