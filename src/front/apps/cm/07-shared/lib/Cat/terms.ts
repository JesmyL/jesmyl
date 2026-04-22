import { Atom, atom } from 'atomaric';
import { CmCatWid } from 'shared/api';

const termAtoms: PRecord<CmCatWid, Atom<string>> = {};

export const takeCatTermAtom = (catw: CmCatWid) => (termAtoms[catw] ??= atom('', `cm:comListSearch:${catw}`));
