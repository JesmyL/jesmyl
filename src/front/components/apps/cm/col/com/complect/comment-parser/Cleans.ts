import { makePseudoElementCorrectContentText } from '#shared/lib/getParentNodeWithClassName';
import { mylib } from '#shared/lib/my-lib';
import { BibleBookTranslates } from '$bible/basis/contexts/TranslatesContext';
import { bibleLowerBooks, bibleTitles } from '$bible/basis/lib/const/bibleTitles';
import { bibleAllTranslates, translateDescriptions } from '$bible/basis/lib/const/consts';
import { makeNamedRegExp, makeRegExp } from 'regexpert';
import { BibleTranslateName, CmComCommentBlockSelector, CmComOrderWid } from 'shared/api';
import { css } from 'styled-components';
import { Order } from '../../order/Order';

let titlesMap: Map<string, number>;
const orderWidSecretifyLine = `iwvthjkfsz` as const;
const orderInheritiSecretifyLine = `IWVTHJKFSZ` as const;

export class ComBlockCommentMakerCleans {
  static makeOrdSelector = (ord: Order): CmComCommentBlockSelector =>
    ord.me.leadOrd && ord.me.watchOrd ? `${ord.me.leadOrd.wid}_${ord.me.watchOrd.wid}` : ord.wid;

  static commentsParseReg = (specialNumber: number | string) =>
    makeNamedRegExp(
      `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${specialNumber})(?<associations>_?(?<secretOrdWid>[${orderWidSecretifyLine}]*)(?<secretOrdInheritWid>[${orderInheritiSecretifyLine}]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]*?)(?=\\n *#|$)/g`,
    );
  static commentsAnySpecialNumberParseReg = this.commentsParseReg('\\d*');

  static withHeaderTextOrderFilter = (ord: Order) => !ord.isHeaderNoneForce && ord.isVisible;

  static makeSecretToWid = (infoWidStr: string) =>
    infoWidStr
      ? (+('' + infoWidStr || '').replace(
          makeRegExp(`/[${orderWidSecretifyLine}]/g`),
          all => '' + orderWidSecretifyLine.indexOf(all),
        ) as CmComOrderWid)
      : null;

  static makeWidToSecret = (wid: CmComOrderWid) =>
    ('' + wid).replace(makeRegExp('/./g'), all => orderWidSecretifyLine[+all]);

  static makeSecretToInheritWid = (infoWidStr: string | nil) =>
    infoWidStr
      ? (+('' + infoWidStr || '').replace(
          makeRegExp(`/[${orderInheritiSecretifyLine}]/g`),
          all => '' + orderInheritiSecretifyLine.indexOf(all),
        ) as CmComOrderWid)
      : null;

  static makePseudoComment = (text: string) => makePseudoElementCorrectContentText(text.trim());

  static makePseudoCommentContentCss = (text: string) => css`
    content: '${this.makePseudoComment(text)}';
    opacity: var(--comment-opacity-accent);
    display: block;
    white-space: pre-line;
    word-wrap: break-word;
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
        .map(({ full, short }, i) => [
          [full, i],
          [short, i],
        ])
        .flat() as never,
    );
    const accentsCss = this.makePseudoCommentContentAccentsCss(startComment);
    let isThereUnsettedTranslate = false;

    startComment = startComment.replace(this.commentHeadBibleAddressRegExp.regExp, (...args) => {
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

      const booki =
        addr.bookTitle === undefined
          ? undefined
          : (titlesMap.get(`${addr.bookNumber ?? ''}${addr.bookTitle.toLowerCase()}`) ??
            titlesMap.get(`${addr.bookNumber}-я ${addr.bookTitle.toLowerCase()}`) ??
            titlesMap.get(`${addr.bookNumber}-е ${addr.bookTitle.toLowerCase()}`) ??
            titlesMap.get(`от ${addr.bookTitle.toLowerCase()}`) ??
            titlesMap.get(`1${addr.bookTitle.toLowerCase()}`) ??
            titlesMap.get(`1-е ${addr.bookTitle.toLowerCase()}`) ??
            titlesMap.get(`1-я ${addr.bookTitle.toLowerCase()}`));

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

      if (addr.verseDiapason) {
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
      }

      return (
        `\n${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}${addr.verseTo ? `-${addr.verseTo}` : ''} ` +
        `${tNameUpper} (${translateDescriptions[tName]})` +
        text.replace(makeRegExp('/</?[^>]+>/g'), '')
      );
    });

    return {
      isThereUnsettedTranslate,
      startCommentCss: css`
        ${this.makePseudoCommentContentCss(startComment)}
        ${accentsCss}
      `,
    };
  };
}
