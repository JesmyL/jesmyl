import { atom, useAtomSet, useAtomValue } from 'front/08-shared/lib/atoms';
import { FixedResizerLines } from './model';

const fixedResizerLinesAtom = atom<FixedResizerLines | null>(null);
export const useFixedResizerLines = () => useAtomValue(fixedResizerLinesAtom);
export const useFixedResizerLinesSet = () => useAtomSet(fixedResizerLinesAtom);
