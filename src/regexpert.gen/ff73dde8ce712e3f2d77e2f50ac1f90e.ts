/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../front/apps/bible/06-entities/broadcast-search/lib/transformers');

namespace Nff73dde8ce712e3f2d77e2f50ac1f90e_1 {
  type $0 = `${$bookNum}${U1 | ''}${OptRepeatingString<string>}${U2}${OptRepeatingString<string>}${U3 | ''}`;
  type $bookNum = `${number | ``}`;
  type $bookName = `${string}${RepeatingString<`${string}`>}`;
  type $bookNameEn = `${string}${OptRepeatingString<`${string}`>}`;
  type $chapter = `${number}`;
  type $verse = `${number}`;
  type $verseSeparator = `${string}${`${string}` | ''}`;
  type $finishVerse = `${number}`;
  
  type U1 = `${`-` | ''}${string}${`${string}` | ''}`;
  type U2 = $bookName | $bookNameEn;
  type U3 = `${$chapter}${U4 | ''}`;
  type U4 = `${U5}${$verse}${U6}${$finishVerse | ''}`;
  type U5 = `:` | RepeatingString<string>;
  type U6 = `${OptRepeatingString<string>}${$verseSeparator}${OptRepeatingString<string>}`;

  export interface I extends Record<
    `/(?<bookNum>\\d?)(?:-?[ея]?)?\\s*(?:(?<bookName>[${string}]+)|(?<bookNameEn>[a-z]*))\\s*(?:(?<chapter>\\d{1,3})(?:(?::|\\s+)(?<verse>\\d{1,3})(?:\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerse>\\d{1,3})?)?)?/`,
    {
      $0: $0;
      /** characters: **0 1 2 3 4 5 6 7 8 9** */
      bookNum: $bookNum;
      bookName?: $bookName;
      bookNameEn?: $bookNameEn;
      /** characters: **0 1 2 3 4 5 6 7 8 9** */
      chapter: $chapter;
      /** characters: **0 1 2 3 4 5 6 7 8 9** */
      verse: $verse;
      verseSeparator: $verseSeparator;
      /** characters: **0 1 2 3 4 5 6 7 8 9** */
      finishVerse?: $finishVerse
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends Nff73dde8ce712e3f2d77e2f50ac1f90e_1.I {
    '': ''
}