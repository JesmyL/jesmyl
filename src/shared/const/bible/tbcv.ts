import { BibleTbcvKey, BibleTranslateName } from 'shared/model/bible';

export const bibleTbcvKeyTranslateDict: Record<BibleTranslateName, BibleTbcvKey> = {
  [BibleTranslateName.rst]: 's' as never,
  [BibleTranslateName.nrt]: 'n' as never,
  [BibleTranslateName.kas]: 'k' as never,
  [BibleTranslateName.kzb]: 'z' as never,
};
