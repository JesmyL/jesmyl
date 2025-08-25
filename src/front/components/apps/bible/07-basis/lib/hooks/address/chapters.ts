import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { useBibleShowTranslatesValue } from '$bible/basis/lib/hooks/translates';
import { BibleChapteri } from '$bible/basis/model/base';
import { useAtomValue } from 'atomaric';
import { bibleChapteriAtom } from '../../store/atoms';
import { useBibleAddressBooki } from './books';

export const useBibleAddressChapteri = (): BibleChapteri => {
  const chapteri = useAtomValue(bibleChapteriAtom);
  const currentBooki = useBibleAddressBooki();
  const showTranslates = useBibleShowTranslatesValue();
  const chapter = useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];

  return chapteri < 0 ? 0 : chapter != null && chapteri > chapter.length - 1 ? chapter.length - 1 : chapteri;
};
