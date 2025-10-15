/* eslint-disable @typescript-eslint/no-namespace */
import('../front/apps/bible/06-entities/broadcast-search/lib/transformers');

namespace Nb09d67b661fb57bb15ee68ed2e7d8d57_1 {
  type $0 = `${$bookNum}${U1 | ''}${OptRepeatingString<string>}${U2}${OptRepeatingString<string>}${U3 | ''}`;
  type $bookNum = `${number | ``}`;
  type $bookName = RepeatingString<string>;
  type $bookNameEn = OptRepeatingString<string>;
  type $chapter = `${number}`;
  type $verse = $chapter;
  type $verseSeparator = string | '';
  type $finishVerse = $chapter;

  type U1 = `${`-` | ''}${string | ''}`;
  type U2 = $bookName | $bookNameEn;
  type U3 = `${$chapter}${U4 | ''}`;
  type U4 = `${U5}${$verse}${U6}${$finishVerse | ''}`;
  type U5 = `:` | RepeatingString<string>;
  type U6 = `${OptRepeatingString<string>}${$verseSeparator}${OptRepeatingString<string>}`;

  export interface I
    extends Record<
      `/(?<bookNum>\\d?)(?:-?[ея]?)?\\s*(?:(?<bookName>[а-яё]+)|(?<bookNameEn>[a-z]*))\\s*(?:(?<chapter>\\d{1,3})(?:(?::|\\s+)(?<verse>\\d{1,3})(?:\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerse>\\d{1,3})?)?)?/`,
      {
        $0: $0;
        bookNum: $bookNum;
        bookName?: $bookName;
        bookNameEn?: $bookNameEn;
        chapter: $chapter;
        verse: $verse;
        verseSeparator: $verseSeparator;
        finishVerse?: $finishVerse;
      }
    > {
    '': '';
  }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes extends Nb09d67b661fb57bb15ee68ed2e7d8d57_1.I {
  '': '';
}
