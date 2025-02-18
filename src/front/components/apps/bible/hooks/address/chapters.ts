import { useBibleTranslatesContext } from '#basis/lib/contexts/bible/TranslatesContext';
import { BibleChapteri } from '../../../../../07-basis/model/bible';
import { useBibleShowTranslatesValue } from '../../translates/hooks';
import { useBibleChapteri } from '../../translations/lists/atoms';
import { useBibleAddressBooki } from './books';

export const useBibleAddressChapteri = (): BibleChapteri => {
  const [chapteri] = useBibleChapteri();
  const currentBooki = useBibleAddressBooki();
  const showTranslates = useBibleShowTranslatesValue();
  const chapter = useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];

  return chapteri < 0 ? 0 : chapter != null && chapteri > chapter.length - 1 ? chapter.length - 1 : chapteri;
};
