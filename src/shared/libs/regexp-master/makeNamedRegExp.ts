import { makeRegExp, StrRegExp } from './makeRegExp';
import { prepareNameMakedRegExp } from './utils';

const replacers: Record<string, (reps: Record<string, string | und>) => string> = {};
const regReps: Record<string, [reg: RegExp, replacer: Parameters<''['replace']>[1]]> = {};

export const makeNamedRegExp: MakeNamedRegExp = (reg, replacer, setLastIndexTo) => {
  replacers[reg] = replacer as never;

  if (regReps[reg] === undefined) {
    const { names, perparedRegStr: perparedReg, positions } = prepareNameMakedRegExp(reg);

    regReps[reg] = [
      makeRegExp(perparedReg as never),
      (...args) => {
        const reps: Record<string, string | und> = { $0: args[0] };

        for (const pos of positions) {
          if (pos in names) reps[names[pos]] = args[pos];
          else reps[`$${pos}`] = args[pos];
        }

        return replacers[reg](reps);
      },
    ];
  }

  if (setLastIndexTo !== undefined) regReps[reg][0].lastIndex = setLastIndexTo;

  return regReps[reg];
};

// types

type MakeNamedRegExp = <
  Reg extends StrRegExp,
  R extends Reg extends keyof TheNamedRegExtMakerRegTypes ? Reg : keyof TheNamedRegExtMakerRegTypes,
>(
  reg: R,
  replacer: (reps: TheNamedRegExtMakerRegTypes[R]) => string,
  setLastIndexTo?: number,
) => (typeof regReps)[string];
