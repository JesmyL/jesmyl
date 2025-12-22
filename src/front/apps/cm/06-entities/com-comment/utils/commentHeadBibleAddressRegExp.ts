import { bibleAllTranslates } from '$bible/ext';
import { makeNamedRegExp } from 'regexpert';

export const cmComCommentHeadBibleAddressRegExp = makeNamedRegExp(
  `/(?<translate>${
    '' + bibleAllTranslates.join('|')
  }:)?(?<book>(?<bookPrefix>(?<bookNumberWithSuffix>(?<bookNumber>\\d{1,3})-?(?<bookNumberSuffix>[яе]?)|(?<bookTitleFrom>От)) *)?(?<bookTitle>[а-яё]+))+ *(?<chapter>\\d{1,3}):(?<verseDiapason>(?<verseFrom>\\d{1,3})(?<verseTail>-(?<verseTo>\\d{1,3}))?)/gi`,
);
