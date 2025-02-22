import { BibleChapteri } from '@bible/model';
import { useBibleShowTranslatesValue } from '@bible/translates/hooks';
import { useBibleTranslatesContext } from '@bible/translates/TranslatesContext';
import { useBibleChapteri } from '@bible/translations/lists/atoms';
import { useBibleAddressBooki } from './books';

export const useBibleAddressChapteri = (): BibleChapteri => {
  const [chapteri] = useBibleChapteri();
  const currentBooki = useBibleAddressBooki();
  const showTranslates = useBibleShowTranslatesValue();
  const chapter = useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];

  return chapteri < 0 ? 0 : chapter != null && chapteri > chapter.length - 1 ? chapter.length - 1 : chapteri;
};
