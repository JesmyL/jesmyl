import { bibleBookiAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';

export const useBibleAddressBooki = () => useAtomValue(bibleBookiAtom);
