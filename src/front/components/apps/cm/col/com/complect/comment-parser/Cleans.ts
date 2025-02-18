import { BibleBookTranslates, bibleLowerBooks } from '#basis/lib/contexts/bible/TranslatesContext';
import { makePseudoElementCorrectContentText } from 'front/08-shared/lib/utils';
import { bibleTitles } from 'front/components/apps/bible/hooks/bibleTitlesJson';
import { mylib } from 'front/utils';
import { makeRegExp } from 'shared/utils';
import { css } from 'styled-components';
import { CmComOrderWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { bibleAllTranslates, translateDescriptions } from '../../../../../bible/translates/complect';
import { Order } from '../../order/Order';

let titlesMap: Map<string, number>;

export class ComBlockCommentMakerCleans {
  private static numberAssociationLine = 'iwvthjkfsz';

  static spaceFreeText = (text: string) => text.replace(makeRegExp('/\\s+/g'), '');
  static makeComOrderHeaderSelector = (blockNumber: number | string) =>
    `.styled-block:nth-child(${blockNumber} of :has(.styled-header)) .styled-header`;

  static commentsParseReg = (specialNumber: number | string = '\\d*') =>
    makeRegExp(
      `/(^|\\n)( *)(#{1,2})(${specialNumber})(_?([${this.numberAssociationLine}]*)(!?))? *(\\[(.+?)\\])?( *)([\\w\\W]+?)(?=\\n *#|$)/g`,
    );
  static makePropsFromCommentsArgs = (args: [string, ...(string | und)[]]) => {
    const [
      $all,
      $before,
      $beforeSpaces,
      $hashes,
      $blockHashPosition,
      $associations,
      $secretWidStr,
      $modificators,
      $info,
      $blockHeader,
      $beforeCommentSpaces,
      $comment,
    ] = args;

    return {
      $all,
      $before,
      $beforeSpaces,
      $hashes,
      $blockHashPosition,
      $associations,
      $secretWidStr,
      $modificators,
      $info,
      $blockHeader,
      $beforeCommentSpaces,
      $comment,
    };
  };

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

  static firstCommentBibleAddressRegExp = makeRegExp(
    `/(${
      '' + bibleAllTranslates.join('|')
    }):((((\\d{1,3})-?([яе]?)|(От)) *)?([а-яё]+))+ *(\\d{1,3}):((\\d{1,3})(-(\\d{1,3}))?)/gi`,
  );
  static makePropsFromCommentBibleAddressArgs = (args: [string, ...(string | und)[]]) => {
    const [
      $all,
      $translate,
      $book,
      $bookPrefix,
      $bookNumberWithSuffix,
      $bookNumber,
      $bookNumberSuffix,
      $bookTitleFrom,
      $bookTitle,
      $chapter,
      $verseDiapason,
      $verseFrom,
      $verseTail,
      $verseTo,
    ] = args;
    return {
      $all,
      $translate,
      $book,
      $bookPrefix,
      $bookNumberSuffix,
      $bookNumberWithSuffix,
      $bookNumber,
      $bookTitleFrom,
      $bookTitle,
      $chapter,
      $verseDiapason,
      $verseFrom,
      $verseTail,
      $verseTo,
    } as const;
  };

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

    startComment = startComment.replace(this.firstCommentBibleAddressRegExp, (...args) => {
      const addr = this.makePropsFromCommentBibleAddressArgs(args);

      const translate = translates[addr.$translate as 'rst'];
      if (translate == null || translate.chapters == null)
        return `<ПЕРЕВОД ${addr.$translate} НЕ УСТАНОВЛЕН>:${addr.$book} ${addr.$chapter}:${addr.$verseDiapason}`;

      const booki =
        addr.$bookTitle === undefined
          ? undefined
          : titlesMap.get(`${addr.$bookNumber || ''}${addr.$bookTitle.toLowerCase()}`) ??
            titlesMap.get(`${addr.$bookNumber}-я ${addr.$bookTitle.toLowerCase()}`) ??
            titlesMap.get(`${addr.$bookNumber}-е ${addr.$bookTitle.toLowerCase()}`) ??
            titlesMap.get(`от ${addr.$bookTitle.toLowerCase()}`) ??
            titlesMap.get(`1${addr.$bookTitle.toLowerCase()}`) ??
            titlesMap.get(`1-е ${addr.$bookTitle.toLowerCase()}`) ??
            titlesMap.get(`1-я ${addr.$bookTitle.toLowerCase()}`);

      const bookTitle =
        (addr.$bookNumber ? `${addr.$bookNumber}${addr.$bookNumberSuffix ? `-${addr.$bookNumberSuffix}` : ''} ` : '') +
        addr.$bookTitle;

      if (booki === undefined)
        return `${addr.$translate}:<КНИГА ${bookTitle} НЕ НАЙДЕНА> ${addr.$chapter}:${addr.$verseDiapason}`;

      const fullBibleTitle = bibleTitles.titles[booki]?.[0] || bookTitle;
      const book = translate.chapters[booki];

      if (book == null)
        return (
          `${addr.$translate}:<КНИГИ "${fullBibleTitle}" В ПЕРЕВОДЕ ` +
          `${translateDescriptions[addr.$translate as 'rst'] || ''} НЕТ> ${addr.$chapter}:${addr.$verseDiapason}`
        );

      const chapteri = +addr.$chapter! - 1;

      if (mylib.isNaN(chapteri) || chapteri == null) return addr.$all;

      if (book[chapteri] == null)
        return `${addr.$translate}:${fullBibleTitle} <${addr.$chapter} ГЛАВЫ НЕТ>:${addr.$verseDiapason}`;

      let text = '';

      if (addr.$verseDiapason) {
        const [verseFromStr, verseToStr] = addr.$verseDiapason.split('-');
        const fromVersei = +verseFromStr - 1;

        if (mylib.isNaN(fromVersei) || book[chapteri][fromVersei] == null)
          return (
            `${addr.$translate}:${fullBibleTitle} ${addr.$chapter}:<${addr.$verseFrom} СТИХА НЕТ>` +
            (addr.$verseTail || '')
          );

        if (verseToStr != null) {
          const toVersei = +verseToStr - 1;

          if (mylib.isNaN(toVersei) || book[chapteri][toVersei] == null)
            return `${addr.$translate}:${fullBibleTitle} ${addr.$chapter}:${addr.$verseFrom}-<${verseToStr} СТИХА НЕТ>`;

          if (toVersei <= fromVersei)
            return (
              `${addr.$translate}:${fullBibleTitle} ${addr.$chapter}:<${addr.$verseFrom}` +
              `${addr.$verseTail || ''} ОШИБКА ДИАПАЗОНА>`
            );

          for (let versei = fromVersei; versei <= toVersei; versei++) {
            text += `\n${versei + 1}. ${book[chapteri][versei]}`;
          }
        } else text += `\n${book[chapteri][fromVersei]}`;
      }

      return (
        `\n\n${fullBibleTitle} ${addr.$chapter}:${addr.$verseFrom}${addr.$verseTo ? `-${addr.$verseTo}` : ''} ` +
        `(${translateDescriptions[addr.$translate as 'rst']})\n` +
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
