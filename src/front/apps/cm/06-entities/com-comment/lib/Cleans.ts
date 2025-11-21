import { makePseudoElementCorrectContentText } from '#shared/lib/getParentNodeWithClassName';
import { mylib } from '#shared/lib/my-lib';
import {
  bibleAllTranslates,
  BibleBookTranslates,
  bibleLowerBooks,
  bibleTitles,
  translateDescriptions,
} from '$bible/ext';
import { makeNamedRegExp, makeRegExp } from 'regexpert';
import { BibleTranslateName } from 'shared/api';
import { css } from 'styled-components';

let titlesMap: Map<string, number>;
let titlesLine: string[];
export class CmComCommentMakerCleans {
  static makePseudoComment = (text: string) => makePseudoElementCorrectContentText(text.trim());

  static makePseudoCommentContentCss = (text: string) => css`
    content: '${this.makePseudoComment(text)}';
  `;

  static pseudoCommentStaticPropsCss = css`
    opacity: var(--comment-opacity-accent);
    display: block;
    white-space: break-spaces;
    word-wrap: break-word;
    max-width: calc(100vw - var(--comment-margin-left) - var(--styled-block-margin-left) - 45px);
  `;

  static makePseudoCommentContentAccentsCss = (text: string) => {
    return css`
      ${text.includes('!!')
        ? css`
            color: var(--color--ko);
          `
        : text.includes('!')
          ? css`
              color: var(--color--7);
            `
          : css`
              opacity: var(--comment-opacity);
            `}
    `;
  };

  static commentHeadBibleAddressRegExp = makeNamedRegExp(
    `/(?<translate>${
      '' + bibleAllTranslates.join('|')
    }:)?(?<book>(?<bookPrefix>(?<bookNumberWithSuffix>(?<bookNumber>\\d{1,3})-?(?<bookNumberSuffix>[яе]?)|(?<bookTitleFrom>От)) *)?(?<bookTitle>[а-яё]+))+ *(?<chapter>\\d{1,3}):(?<verseDiapason>(?<verseFrom>\\d{1,3})(?<verseTail>-(?<verseTo>\\d{1,3}))?)/gi`,
  );

  static makeStartCommentCss = async (
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

    const accentsCss = this.makePseudoCommentContentAccentsCss(startComment);
    let isThereUnsettedTranslate = false;
    let isThereCorrectBibleText = false;

    const makeStartComment = (isWithoutText?: boolean) =>
      startComment.replace(this.commentHeadBibleAddressRegExp.regExp, (...args) => {
        const addr = this.commentHeadBibleAddressRegExp.transform(args);

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
      commentWithTextCss: this.makePseudoCommentContentCss(makeStartComment()),
      commentWithTextLinksOnlyCss: this.makePseudoCommentContentCss(makeStartComment(true)),
      isThereUnsettedTranslate,
      isThereCorrectBibleText,
      accentsCss,
    };
  };
}
