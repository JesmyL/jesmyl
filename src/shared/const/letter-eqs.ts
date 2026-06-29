import { makeRegExp } from 'regexpert';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectKeys } from 'shared/utils/object.utils';

export const enRuLetterVisualEquivalentLazy = lazyInit(() => {
  const eqs = {
    a: 'а',
    A: 'А',
    B: 'В',
    r: 'г',
    D: 'Д',
    q: 'д',
    E: 'Е',
    e: 'е',
    u: 'и',
    K: 'К',
    k: 'к',
    M: 'М',
    H: 'Н',
    O: 'О',
    o: 'о',
    n: 'п',
    P: 'Р',
    p: 'р',
    C: 'С',
    c: 'с',
    T: 'Т',
    m: 'т',
    Y: 'У',
    y: 'у',
    X: 'Х',
    x: 'х',
    W: 'Ш',
    w: 'ш',
    b: 'ь',
  };

  const reg = makeRegExp(`/[${objectKeys(eqs).join('')}]/g`);
  const rep = (all: string) => eqs[all as never] || all;

  return { repl: (text: string) => text.replace(reg, rep) };
});
