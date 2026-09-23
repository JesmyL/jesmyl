 
/* eslint-disable @typescript-eslint/no-namespace */
import('../front/apps/cm/06-entities/com-comment/utils/commentHeadBibleAddressRegExp');

namespace N816029c951da2f00df2effa4682c97bd_1 {
  type $0 = `${$translate | ''}${$book}${OptRepeatingString<` `>}${$chapter}:${$verseDiapason}`;
  type $translate = `${string}:`;
  type $book = `${$bookPrefix | ''}${$bookTitle}`;
  type $bookPrefix = `${$bookNumberWithSuffix}${OptRepeatingString<` `>}`;
  type $bookNumberWithSuffix = `${$bookNumber}${`-` | ''}${$bookNumberSuffix}` | $bookTitleFrom;
  type $bookNumber = `${number}`;
  type $bookNumberSuffix = `${string}${`${string}` | ''}`;
  type $bookTitleFrom = `От`;
  type $bookTitle = `${string}${RepeatingString<`${string}`>}`;
  type $chapter = `${number}`;
  type $verseDiapason = `${$verseFrom}${$verseTail | ''}`;
  type $verseFrom = `${number}`;
  type $verseTail = `-${$verseTo}`;
  type $verseTo = `${number}`;

  export interface I
    extends Record<
      `/(?<translate>${string}:)?(?<book>(?<bookPrefix>(?<bookNumberWithSuffix>(?<bookNumber>\\d{1,3})-?(?<bookNumberSuffix>[яе]?)|(?<bookTitleFrom>От)) *)?(?<bookTitle>[${string}]+))+ *(?<chapter>\\d{1,3}):(?<verseDiapason>(?<verseFrom>\\d{1,3})(?<verseTail>-(?<verseTo>\\d{1,3}))?)/gi`,
      IgnoreCaseRecord<{
        $0: $0;
        translate?: $translate;
        book: $book;
        bookPrefix?: $bookPrefix;
        bookNumberWithSuffix?: $bookNumberWithSuffix;
        /** characters: **0 1 2 3 4 5 6 7 8 9** */
        bookNumber?: $bookNumber;
        bookNumberSuffix?: $bookNumberSuffix;
        bookTitleFrom?: $bookTitleFrom;
        bookTitle: $bookTitle;
        /** characters: **0 1 2 3 4 5 6 7 8 9** */
        chapter: $chapter;
        verseDiapason: $verseDiapason;
        /** characters: **0 1 2 3 4 5 6 7 8 9** */
        verseFrom: $verseFrom;
        verseTail?: $verseTail;
        /** characters: **0 1 2 3 4 5 6 7 8 9** */
        verseTo?: $verseTo;
      }>
    > {
    '': '';
  }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes extends N816029c951da2f00df2effa4682c97bd_1.I {
  '': '';
}
