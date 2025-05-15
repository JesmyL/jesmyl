/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../front/components/apps/bible/translations/search/input-panel/address/hooks/transformers');

namespace Nb09d67b661fb57bb15ee68ed2e7d8d57_1 {
  type $0 = `${$bookn}${OptRepeatingString<string>}${$2 | ''}`;
  type $bookn = `${number | ``}${OptRepeatingString<string>}${RepeatingString<string>}`;
  type $2 = `${$chapterStr}${$4 | ''}`;
  type $chapterStr = `${number}`;
  type $4 = `${$5}${$verseStr}${$7}${$finishVerseStr | ''}`;
  type $5 = `:` | RepeatingString<string>;
  type $verseStr = `${number}`;
  type $7 = `${OptRepeatingString<string>}${$verseSeparator}${OptRepeatingString<string>}`;
  type $verseSeparator = string | '';
  type $finishVerseStr = `${number}`;

  export interface I extends Record<
    `/(?<bookn>\\d?\\s*[а-яё]+)\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>\\d{1,3})(\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerseStr>\\d{1,3})?)?)?/`,
    {
      $0: $0;
      bookn: $bookn;
      $2?: $2;
      chapterStr?: $chapterStr;
      $4?: $4;
      $5?: $5;
      verseStr?: $verseStr;
      $7?: $7;
      verseSeparator?: $verseSeparator;
      finishVerseStr?: $finishVerseStr
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends Nb09d67b661fb57bb15ee68ed2e7d8d57_1.I {
    '': ''
}