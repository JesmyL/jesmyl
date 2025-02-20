import { BibleChapteri } from '@bible/model';
import { useBibleChapteri } from '@bible/shared/translations/atoms';
import { useBibleShowTranslatesValue } from '@bible/translates/hooks';
import { useBibleTranslatesContext } from '@bible/translates/TranslatesContext';
import { useBibleCurrentBooki } from './books';

export const useBibleCurrentChapteri = (): BibleChapteri => {
  const [chapteri] = useBibleChapteri();
  const currentBooki = useBibleCurrentBooki();
  const showTranslates = useBibleShowTranslatesValue();
  const chapter = useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];

  return chapteri < 0 ? 0 : chapter != null && chapteri > chapter.length - 1 ? chapter.length - 1 : chapteri;
};

export const useBibleCurrentChapterList = () => {
  const currentBooki = useBibleCurrentBooki();
  const showTranslates = useBibleShowTranslatesValue();
  return useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki];
};
