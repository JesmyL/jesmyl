import { mylib } from '#shared/lib/my-lib';
import { BibleBookTranslates, bibleLowerBooks, bibleTitles, translateDescriptions } from '$bible/ext';
import { makeRegExp } from 'regexpert';
import { BibleTranslateName } from 'shared/api';
import { cmComCommentHeadBibleAddressRegExp } from './commentHeadBibleAddressRegExp';
import {
  cmComCommentMakePseudoCommentContentAccentsColorCss,
  cmComCommentMakePseudoCommentContentPropCss,
  cmComCommentTrimHighlightMarkers,
} from './makePseudoComment.props';

let titlesMap: Map<string, number>;
let titlesLine: string[];

export const cmComCommentMakeStartCommentCss = async (
  currentBibleTranslate: BibleTranslateName,
  startComment: string,
  translates: BibleBookTranslates,
) => {
  titlesMap ??= new Map(
    bibleLowerBooks
      .map(
        ({ full, short }, i) =>
          [
            [full, i],
            [short, i],
          ] as const,
      )
      .flat(),
  );

  const accentsCss = cmComCommentMakePseudoCommentContentAccentsColorCss(startComment);
  let isThereUnsettedTranslate = false;
  let isThereCorrectBibleText = false;

  const makeStartComment = (isWithoutText?: boolean) =>
    startComment.replace(cmComCommentHeadBibleAddressRegExp.regExp, (...args) => {
      const addr = cmComCommentHeadBibleAddressRegExp.transform(args);

      if (!addr.translate || !addr.translate.slice(0, -1)) isThereUnsettedTranslate ||= true;

      const tName = (
        addr.translate?.slice(0, -1) ||
        currentBibleTranslate ||
        'rst'
      ).toLowerCase() as BibleTranslateName;

      const tNameUpper = tName.toUpperCase() as BibleTranslateName;

      const translate = translates[tName];
      if (translate == null || translate.chapters == null) {
        return `\n<ПЕРЕВОД ${tNameUpper} НЕ УСТАНОВЛЕН>:${addr.book} ${addr.chapter}:${addr.verseDiapason}`;
      }

      let booki = undefined as number | und;

      if (addr.bookTitle !== undefined) {
        const lowerBookTitle = addr.bookTitle.toLowerCase();

        booki =
          titlesMap.get(`${addr.bookNumber ?? ''}${lowerBookTitle}`) ??
          titlesMap.get(`${addr.bookNumber}-я ${lowerBookTitle}`) ??
          titlesMap.get(`${addr.bookNumber}-е ${lowerBookTitle}`) ??
          titlesMap.get(`от ${lowerBookTitle}`) ??
          titlesMap.get(`к ${lowerBookTitle}`) ??
          titlesMap.get(`1${lowerBookTitle}`) ??
          titlesMap.get(`1-е ${lowerBookTitle}`) ??
          titlesMap.get(`1-я ${lowerBookTitle}`);

        if (booki === undefined) {
          titlesLine = Array.from(titlesMap.keys());
          const titleName =
            titlesLine.find(title => title.startsWith(lowerBookTitle)) ??
            titlesLine.find(title => title.includes(lowerBookTitle));

          if (titleName !== undefined) booki = titlesMap.get(titleName);
        }
      }

      const bookTitle =
        (addr.bookNumber ? `${addr.bookNumber}${addr.bookNumberSuffix ? `-${addr.bookNumberSuffix}` : ''} ` : '') +
        addr.bookTitle;

      if (booki === undefined)
        return `\n${tNameUpper}:<КНИГА ${bookTitle} НЕ НАЙДЕНА> ${addr.chapter}:${addr.verseDiapason}`;

      const fullBibleTitle = bibleTitles.titles[booki]?.full || bookTitle;
      const book = translate.chapters[booki];

      if (book == null)
        return (
          `\n${tNameUpper}:<КНИГИ "${fullBibleTitle}" В ПЕРЕВОДЕ ${tNameUpper} ` +
          `${translateDescriptions[tName] || ''} НЕТ> ${addr.chapter}:${addr.verseDiapason}`
        );

      const chapteri = +addr.chapter! - 1;

      if (mylib.isNaN(chapteri) || chapteri == null) return addr.$0;

      if (book[chapteri] == null)
        return `\n${tNameUpper}:${fullBibleTitle} <${addr.chapter} ГЛАВЫ НЕТ>:${addr.verseDiapason}`;

      let text = '';

      if (!isWithoutText && addr.verseDiapason) {
        const [verseFromStr, verseToStr] = addr.verseDiapason.split('-');
        const fromVersei = +verseFromStr - 1;

        if (mylib.isNaN(fromVersei) || book[chapteri][fromVersei] == null)
          return (
            `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom} СТИХА НЕТ>` + (addr.verseTail || '')
          );

        if (verseToStr != null) {
          const toVersei = +verseToStr - 1;

          if (mylib.isNaN(toVersei) || book[chapteri][toVersei] == null)
            return `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}-<${verseToStr} СТИХА НЕТ>`;

          if (toVersei <= fromVersei)
            return (
              `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom}` +
              `${addr.verseTail || ''} ОШИБКА ДИАПАЗОНА>`
            );

          for (let versei = fromVersei; versei <= toVersei; versei++) {
            text += `\n${versei + 1}. ${book[chapteri][versei]}`;
          }
        } else text += `\n${book[chapteri][fromVersei]}`;

        text = text.replace(makeRegExp('/</?[^>]+>/g'), '');
      }

      isThereCorrectBibleText = true;

      return (
        `\n${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}${addr.verseTo ? `-${addr.verseTo}` : ''} ` +
        `${tNameUpper} (${translateDescriptions[tName]})` +
        text
      );
    });

  return {
    makeCommentWithTextCss: () =>
      cmComCommentMakePseudoCommentContentPropCss(cmComCommentTrimHighlightMarkers(makeStartComment())),
    makeCommentWithTextLinksOnlyCss: () =>
      cmComCommentMakePseudoCommentContentPropCss(cmComCommentTrimHighlightMarkers(makeStartComment(true))),
    isThereUnsettedTranslate,
    isThereCorrectBibleText,
    accentsCss,
  };
};
