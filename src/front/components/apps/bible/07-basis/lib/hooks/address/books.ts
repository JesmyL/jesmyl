import { useAtomValue } from 'atomaric';
import { bibleBookiAtom } from '../../store/atoms';

export const useBibleAddressBooki = () => useAtomValue(bibleBookiAtom);
