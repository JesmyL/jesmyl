/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../front/components/apps/cm/col/com/complect/comment-parser/Cleans');

namespace N6919875af70bbcb2cef09ae314751706_1 {
  type $0 = `${$translate | ''}${$book}${OptRepeatingString<` `>}${$chapter}:${$verseDiapason}`;
  type $translate = `${string}:`;
  type $book = `${$bookPrefix | ''}${$bookTitle}`;
  type $bookPrefix = `${$bookNumberWithSuffix}${OptRepeatingString<` `>}`;
  type $bookNumberWithSuffix = `${$bookNumber}${`-` | ''}${$bookNumberSuffix}` | $bookTitleFrom;
  type $bookNumber = `${number}`;
  type $bookNumberSuffix = string | '';
  type $bookTitleFrom = `От`;
  type $bookTitle = RepeatingString<string>;
  type $chapter = `${number}`;
  type $verseDiapason = `${$verseFrom}${$verseTail | ''}`;
  type $verseFrom = `${number}`;
  type $verseTail = `-${$verseTo}`;
  type $verseTo = `${number}`;

  export interface I extends Record<
    `/(?<translate>${string}:)?(?<book>(?<bookPrefix>(?<bookNumberWithSuffix>(?<bookNumber>\\d{1,3})-?(?<bookNumberSuffix>[яе]?)|(?<bookTitleFrom>От)) *)?(?<bookTitle>[а-яё]+))+ *(?<chapter>\\d{1,3}):(?<verseDiapason>(?<verseFrom>\\d{1,3})(?<verseTail>-(?<verseTo>\\d{1,3}))?)/gi`,
    IgnoreCaseRecord<{
      $0: $0;
      translate?: $translate;
      book: $book;
      bookPrefix?: $bookPrefix;
      bookNumberWithSuffix?: $bookNumberWithSuffix;
      bookNumber?: $bookNumber;
      bookNumberSuffix?: $bookNumberSuffix;
      bookTitleFrom?: $bookTitleFrom;
      bookTitle: $bookTitle;
      chapter: $chapter;
      verseDiapason: $verseDiapason;
      verseFrom: $verseFrom;
      verseTail?: $verseTail;
      verseTo?: $verseTo
    }>
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N6919875af70bbcb2cef09ae314751706_1.I {
    '': ''
}