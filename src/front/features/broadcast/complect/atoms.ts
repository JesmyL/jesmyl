import { atom } from 'atomaric';
import { FixedResizerLines } from './model';

export const fixedResizerLinesAtom = atom<FixedResizerLines | null>(null);
