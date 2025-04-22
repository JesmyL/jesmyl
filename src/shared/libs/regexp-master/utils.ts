import { makeNamedRegExp } from './makeNamedRegExp';
import { StrRegExp } from './makeRegExp';

const numbersSet = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
const findNamedGroupsReg = /\\?\((?:\?<([\w$_]+)>)?/g;

export const prepareNameMakedRegExp = (reg: StrRegExp) => {
  let openPosition = 0;
  const positions: number[] = [];
  const names: Record<number, string> = {};
  const contents: Record<string, string> = {};

  const perparedRegStr = reg.replace(findNamedGroupsReg, (all, name, content) => {
    if (all.startsWith('\\')) return all;

    openPosition++;
    positions.push(openPosition);

    if (name !== undefined && name !== '') {
      if (numbersSet.has(name[0])) throw `Incorrect StrRegExp name <${name}> in ${makeNamedRegExp.name}`;
      names[openPosition] = name;
      if (typeof content === 'string') contents[name] = content.slice(0, -1);
    } else if (typeof content === 'string') contents[openPosition] = content.slice(0, -1);

    return '(';
  });

  return { perparedRegStr, positions, names, contents };
};
