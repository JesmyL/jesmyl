import { BibleVersei } from '@bible/model';
import { useBibleShowTranslatesValue } from '@bible/translates/hooks';
import { useBibleTranslatesContext } from '@bible/translates/TranslatesContext';
import { useBibleVersei } from '../atoms';
import { useBibleCurrentBooki } from './books';
import { useBibleCurrentChapteri } from './chapters';

const useBibleAddressCurrentVersei = () => useBibleVersei()[0];

export const useBibleCurrentVersei = (): BibleVersei => {
  const currentChapteri = useBibleCurrentChapteri();
  const currentBooki = useBibleCurrentBooki();
  const currentVersei = useBibleAddressCurrentVersei();
  const showTranslates = useBibleShowTranslatesValue();
  const chapter = useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[currentBooki]?.[currentChapteri];

  return currentVersei < 0
    ? 0
    : chapter != null && currentVersei > chapter.length - 1
      ? chapter.length - 1
      : currentVersei;
};
