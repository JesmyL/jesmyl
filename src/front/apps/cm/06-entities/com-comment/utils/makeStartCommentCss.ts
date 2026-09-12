import { takeBibleLangBooks, translateDescriptions } from '$bible/ext';
import { bibleTbcvEncode, makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { makeRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { BibleTranslateName } from 'shared/model/bible';
import { checkIsNaN } from 'shared/utils/checkIs';
import {
  cmComCommentMakePseudoCommentContentAccentsColorCss,
  cmComCommentMakePseudoCommentContentPropCss,
  cmComCommentTrimHighlightMarkers,
} from 'shared/utils/cm';
import { textToUpperCase } from 'shared/utils/string.utils';
import { cmComCommentHeadBibleAddressRegExp } from './commentHeadBibleAddressRegExp';

const titlesLangMap: PRecord<Langi, Map<string, number>> = {};
let titlesLine: string[];

export const cmComCommentMakeStartCommentCss = async (
  langi: Langi,
  currentBibleTranslate: BibleTranslateName,
  startComment: string,
) => {
  const titlesMap = (titlesLangMap[langi] ??= new Map(
    takeBibleLangBooks(langi).flatMap(({ lfull, lshort }, i) => [[lfull, i] as const, [lshort, i] as const]),
  ));

  const accentsCss = cmComCommentMakePseudoCommentContentAccentsColorCss(startComment);
  let isThereUnsettedTranslate = false;
  let isThereCorrectBibleText = false;

  const makeStartComment = async (isWithoutText?: boolean) => {
    const matches = [...startComment.matchAll(cmComCommentHeadBibleAddressRegExp.regExp)];
    if (!matches.length) return startComment;

    const replacements = await Promise.all(
      matches.map(async match => {
        const addr = cmComCommentHeadBibleAddressRegExp.transform(match);
        const translateName = addr.translate?.slice(0, -1);

        if (!translateName) isThereUnsettedTranslate ||= true;

        const tName = (
          translateName ||
          currentBibleTranslate ||
          BibleTranslateName.rst
        ).toLowerCase() as BibleTranslateName;
        const tNameUpper = textToUpperCase(tName) as BibleTranslateName;
        const translate = await bibleTBCVTranslatesIDB.tb.list
          .where('k')
          .startsWith(makeBibleTbcvPrefix(tName))
          .first();

        if (!translate) {
          return `\n<ПЕРЕВОД ${tNameUpper} НЕ УСТАНОВЛЕН>:${addr.book} ${addr.chapter}:${addr.verseDiapason}`;
        }

        let booki = null as number | nil;
        if (addr.bookTitle != null) {
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

          if (booki == null) {
            titlesLine = Array.from(titlesMap.keys());
            const titleName =
              titlesLine.find(t => t.startsWith(lowerBookTitle)) ?? titlesLine.find(t => t.includes(lowerBookTitle));
            if (titleName != null) booki = titlesMap.get(titleName);
          }
        }

        const bookTitle =
          (addr.bookNumber ? `${addr.bookNumber}${addr.bookNumberSuffix ? `-${addr.bookNumberSuffix}` : ''} ` : '') +
          addr.bookTitle;
        if (booki == null)
          return `\n${tNameUpper}:<КНИГА ${bookTitle} НЕ НАЙДЕНА> ${addr.chapter}:${addr.verseDiapason}`;

        const fullBibleTitle = takeBibleLangBooks(langi)[booki]?.full || bookTitle;

        const book = await bibleTBCVTranslatesIDB.tb.list
          .where('k')
          .startsWith(makeBibleTbcvPrefix(tName, booki))
          .first();

        if (book == null)
          return `\n${tNameUpper}:<КНИГИ "${fullBibleTitle}" В ПЕРЕВОДЕ ${tNameUpper} ${translateDescriptions[tName] || ''} НЕТ> ${addr.chapter}:${addr.verseDiapason}`;

        const chapteri = +addr.chapter! - 1;
        if (checkIsNaN(chapteri)) return addr.$0;
        const chapter = await bibleTBCVTranslatesIDB.tb.list
          .where('k')
          .startsWith(makeBibleTbcvPrefix(tName, booki, chapteri))
          .first();

        if (!chapter) return `\n${tNameUpper}:${fullBibleTitle} <${addr.chapter} ГЛАВЫ НЕТ>:${addr.verseDiapason}`;

        let text = '';
        if (!isWithoutText && addr.verseDiapason) {
          const [verseFromStr, verseToStr] = addr.verseDiapason.split('-');
          const fromVersei = +verseFromStr - 1;

          const fromVerse = await bibleTBCVTranslatesIDB.tb.list.get(
            bibleTbcvEncode(tName, booki, chapteri, fromVersei),
          );

          if (checkIsNaN(fromVersei) || !fromVerse) {
            return (
              `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom} СТИХА НЕТ>` + (addr.verseTail || '')
            );
          }

          if (verseToStr != null) {
            const toVersei = +verseToStr - 1;
            const toVerse = await bibleTBCVTranslatesIDB.tb.list.get(bibleTbcvEncode(tName, booki, chapteri, toVersei));

            if (checkIsNaN(toVersei) || !toVerse)
              return `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}-<${verseToStr} СТИХА НЕТ>`;
            if (toVersei <= fromVersei)
              return `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom}${addr.verseTail || ''} ОШИБКА ДИАПАЗОНА>`;

            const verses = await bibleTBCVTranslatesIDB.tb.list
              .where('k')
              .between(
                bibleTbcvEncode(tName, booki, chapteri, fromVersei),
                bibleTbcvEncode(tName, booki, chapteri, toVersei),
              )
              .toArray();

            for (let versei = fromVersei, i = 0; versei <= toVersei; versei++, i++) {
              text += `\n${versei + 1}. ${verses[i].v}`;
            }
          } else text += `\n${fromVerse.v}`;

          text = text.replace(makeRegExp('/</?[^>]+>/g'), '');
        }

        isThereCorrectBibleText = true;
        return `\n${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}${addr.verseTo ? `-${addr.verseTo}` : ''} ${tNameUpper} (${translateDescriptions[tName]})${text}`;
      }),
    );

    let lastIndex = 0;
    let result = '';
    matches.forEach((match, i) => {
      result += startComment.slice(lastIndex, match.index) + replacements[i];
      lastIndex = match.index! + match[0].length;
    });
    return result + startComment.slice(lastIndex);
  };

  const [withText, linksOnly] = await Promise.all([makeStartComment(), makeStartComment(true)]);

  return {
    makeCommentWithTextCss: () =>
      cmComCommentMakePseudoCommentContentPropCss(cmComCommentTrimHighlightMarkers(withText)),
    makeCommentWithTextLinksOnlyCss: () =>
      cmComCommentMakePseudoCommentContentPropCss(cmComCommentTrimHighlightMarkers(linksOnly)),
    isThereUnsettedTranslate,
    isThereCorrectBibleText,
    accentsCss,
  };
};
