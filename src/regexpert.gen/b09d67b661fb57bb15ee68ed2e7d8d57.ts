/* eslint-disable @typescript-eslint/no-namespace */

namespace Nb09d67b661fb57bb15ee68ed2e7d8d57_1 {
  type $0 = `${Tbookn}${''|`${string}${string}`}${$2 | ''}`;
  type Tbookn = `${number | ''}${''|`${string}${string}`}${string}${string}`;
  type $2 = `${TchapterStr}${$4 | ''}`;
  type TchapterStr = `${number}`;
  type $4 = `${$5}${TverseStr}${$7}${TfinishVerseStr | ''}`;
  type $5 = `:` | `${string}${string}`;
  type TverseStr = `${number}`;
  type $7 = `${''|`${string}${string}`}${TverseSeparator}${''|`${string}${string}`}`;
  type TverseSeparator = `${string | ''}`;
  type TfinishVerseStr = `${number}`;

  export interface I extends Record<
    `/(?<bookn>\\d?\\s*[а-яё]+)\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>\\d{1,3})(\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerseStr>\\d{1,3})?)?)?/i`,
    {
      $0: $0;
      bookn: Tbookn;
      $2?: $2;
      chapterStr?: TchapterStr;
      $4?: $4;
      $5?: $5;
      verseStr?: TverseStr;
      $7?: $7;
      verseSeparator?: TverseSeparator;
      finishVerseStr?: TfinishVerseStr
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends Nb09d67b661fb57bb15ee68ed2e7d8d57_1.I {
    '': ''
}