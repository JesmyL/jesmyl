import { useAtomValue } from 'atomaric';
import { bibleBookiAtom } from '../../state/atoms';

export const useBibleAddressBooki = () => useAtomValue(bibleBookiAtom);
