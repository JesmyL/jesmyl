import { useAtom } from 'atomaric';
import { cmComChordVisibleVariantAtom } from '../state/atoms';

export const useCmComChordVisibleVariant = () => useAtom(cmComChordVisibleVariantAtom);
