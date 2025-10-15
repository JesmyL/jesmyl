import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import { BibleChapteri } from '$bible/shared/model/base';
import { useAtomValue } from 'atomaric';
import { bibleChapteriAtom } from '../../state/atoms';
import { useBibleShowTranslatesValue } from '../translates';
import { useBibleAddressBooki } from './books';

export const useBibleAddressChapteri = (): BibleChapteri => {
  const chapteri = useAtomValue(bibleChapteriAtom);
  const currentBooki = useBibleAddressBooki();
  const showTranslates = useBibleShowTranslatesValue();
  const chapter = useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];

  return chapteri < 0 ? 0 : chapter != null && chapteri > chapter.length - 1 ? chapter.length - 1 : chapteri;
};
