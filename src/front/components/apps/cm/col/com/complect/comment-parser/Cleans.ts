import { makePseudoElementCorrectContentText } from '#shared/lib/getParentNodeWithClassName';
import { mylib } from '#shared/lib/my-lib';
import { BibleBookTranslates } from '$bible/basis/contexts/TranslatesContext';
import { bibleTitles } from '$bible/basis/lib/const/bibleTitlesJson';
import { bibleAllTranslates, bibleLowerBooks, translateDescriptions } from '$bible/basis/lib/const/consts';
import { makeNamedRegExp, makeRegExp } from 'regexp-master';
import { CmComOrderWid } from 'shared/api';
import { css } from 'styled-components';
import { Order } from '../../order/Order';

let titlesMap: Map<string, number>;

export class ComBlockCommentMakerCleans {
  private static numberAssociationLine = 'iwvthjkfsz';

  static spaceFreeText = (text: string) => text.replace(makeRegExp('/\\s+/g'), '');
  static makeComOrderHeaderSelector = (blockNumber: number | string) =>
    `.styled-block:nth-child(${blockNumber} of :has(.styled-header)) .styled-header`;

  static commentsParseReg = (specialNumber: number | string) =>
    makeNamedRegExp(
      `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${specialNumber})(?<associations>_?(?<secretWidStr>[${this.numberAssociationLine}]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
    );
  static commentsAnySpecialNumberParseReg = this.commentsParseReg('\\d*');

  static withHeaderTextOrderFilter = (ord: Order) => !ord.isHeaderNoneForce && ord.isVisible;

  static makeSecretToWid = (infoWidStr: string) =>
    infoWidStr
      ? (+('' + infoWidStr || '').replace(
          makeRegExp(`/[${this.numberAssociationLine}]/g`),
          all => '' + this.numberAssociationLine.indexOf(all),
        ) as CmComOrderWid)
      : null;

  static makeWidToSecret = (wid: CmComOrderWid) =>
    ('' + wid).replace(makeRegExp('/./g'), all => this.numberAssociationLine[+all]);

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

  static firstCommentBibleAddressRegExp = makeNamedRegExp(
    `/(?<translate>${
      '' + bibleAllTranslates.join('|')
    }):(?<book>(?<bookPrefix>(?<bookNumberWithSuffix>(?<bookNumber>\\d{1,3})-?(?<bookNumberSuffix>[яе]?)|(?<bookTitleFrom>От)) *)?(?<bookTitle>[а-яё]+))+ *(?<chapter>\\d{1,3}):(?<verseDiapason>(?<verseFrom>\\d{1,3})(?<verseTail>-(?<verseTo>\\d{1,3}))?)/gi`,
  );

  static makeStartCommentCss = async (comComment: string | nil, translates: BibleBookTranslates) => {
    let startComment = comComment?.match(makeRegExp('/^([^#]*?)(?=\\n *#|$)+/'))?.[0];
    if (!startComment) return '';
    titlesMap ??= new Map(
      bibleLowerBooks
        .map(([fullTitle, shortTitle], i) => [
          [fullTitle, i],
          [shortTitle, i],
        ])
        .flat() as never,
    );
    const accentsCss = this.makePseudoCommentContentAccentsCss(startComment);

    startComment = startComment.replace(this.firstCommentBibleAddressRegExp.regExp, (...args) => {
      const addr = this.firstCommentBibleAddressRegExp.transform(args);

      const translate = translates[addr.translate as 'rst'];
      if (translate == null || translate.chapters == null)
        return `<ПЕРЕВОД ${addr.translate} НЕ УСТАНОВЛЕН>:${addr.book} ${addr.chapter}:${addr.verseDiapason}`;

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
        return `${addr.translate}:<КНИГА ${bookTitle} НЕ НАЙДЕНА> ${addr.chapter}:${addr.verseDiapason}`;

      const fullBibleTitle = bibleTitles.titles[booki]?.[0] || bookTitle;
      const book = translate.chapters[booki];

      if (book == null)
        return (
          `${addr.translate}:<КНИГИ "${fullBibleTitle}" В ПЕРЕВОДЕ ` +
          `${translateDescriptions[addr.translate as 'rst'] || ''} НЕТ> ${addr.chapter}:${addr.verseDiapason}`
        );

      const chapteri = +addr.chapter! - 1;

      if (mylib.isNaN(chapteri) || chapteri == null) return addr.$0;

      if (book[chapteri] == null)
        return `${addr.translate}:${fullBibleTitle} <${addr.chapter} ГЛАВЫ НЕТ>:${addr.verseDiapason}`;

      let text = '';

      if (addr.verseDiapason) {
        const [verseFromStr, verseToStr] = addr.verseDiapason.split('-');
        const fromVersei = +verseFromStr - 1;

        if (mylib.isNaN(fromVersei) || book[chapteri][fromVersei] == null)
          return (
            `${addr.translate}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom} СТИХА НЕТ>` + (addr.verseTail || '')
          );

        if (verseToStr != null) {
          const toVersei = +verseToStr - 1;

          if (mylib.isNaN(toVersei) || book[chapteri][toVersei] == null)
            return `${addr.translate}:${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}-<${verseToStr} СТИХА НЕТ>`;

          if (toVersei <= fromVersei)
            return (
              `${addr.translate}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom}` +
              `${addr.verseTail || ''} ОШИБКА ДИАПАЗОНА>`
            );

          for (let versei = fromVersei; versei <= toVersei; versei++) {
            text += `\n${versei + 1}. ${book[chapteri][versei]}`;
          }
        } else text += `\n${book[chapteri][fromVersei]}`;
      }

      return (
        `\n\n${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}${addr.verseTo ? `-${addr.verseTo}` : ''} ` +
        `(${translateDescriptions[addr.translate as 'rst']})\n` +
        text.replace(makeRegExp('/</?[^>]+>/g'), '')
      );
    });

    return css`
      &:before {
        ${this.makePseudoCommentContentCss(startComment)}
        ${accentsCss}

        margin-bottom: 40px;
      }
    `;
  };
}
