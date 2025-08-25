import { cmChordVisibleVariantAtom } from '$cm/basis/lib/store/atoms';
import { useAtom } from 'atomaric';

export const useChordVisibleVariant = () => useAtom(cmChordVisibleVariantAtom);
