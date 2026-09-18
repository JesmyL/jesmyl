import { takeBibleLangBooks, translateDescriptions } from '$bible/ext';
import { bibleTbcvEncode, makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { makeRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { BibleTranslateName } from 'shared/model/bible';
import { checkIsNaN, checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import {
  cmComCommentMakePseudoCommentContentAccentsColorCss,
  cmComCommentMakePseudoCommentContentPropCss,
  cmComCommentTrimHighlightMarkers,
} from 'shared/utils/cm';
import { textToLowerCase, textToUpperCase } from 'shared/utils/string.utils';
import { cmComCommentHeadBibleAddressRegExp } from './commentHeadBibleAddressRegExp';

const titlesLangMap: PRecord<Langi, Map<string, number>> = {};
let titlesLine: string[];

const makeSafeText = (text: string) => text.replace(makeRegExp('/</?[^>]+>/g'), '');

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

        if (checkIsNotNil(addr.bookTitle)) {
          const lowerBookTitle = textToLowerCase(addr.bookTitle);
          booki =
            titlesMap.get(`${addr.bookNumber ?? ''}${lowerBookTitle}`) ??
            titlesMap.get(`${addr.bookNumber}-я ${lowerBookTitle}`) ??
            titlesMap.get(`${addr.bookNumber}-е ${lowerBookTitle}`) ??
            titlesMap.get(`от ${lowerBookTitle}`) ??
            titlesMap.get(`к ${lowerBookTitle}`) ??
            titlesMap.get(`1${lowerBookTitle}`) ??
            titlesMap.get(`1-е ${lowerBookTitle}`) ??
            titlesMap.get(`1-я ${lowerBookTitle}`);

          if (checkIsNil(booki)) {
            titlesLine = Array.from(titlesMap.keys());
            const titleName =
              titlesLine.find(t => t.startsWith(lowerBookTitle)) ?? titlesLine.find(t => t.includes(lowerBookTitle));
            if (titleName != null) booki = titlesMap.get(titleName);
          }
        }

        const bookTitle =
          (addr.bookNumber ? `${addr.bookNumber}${addr.bookNumberSuffix ? `-${addr.bookNumberSuffix}` : ''} ` : '') +
          addr.bookTitle;

        if (checkIsNil(booki))
          return `\n${tNameUpper}:<КНИГА ${bookTitle} НЕ НАЙДЕНА> ${addr.chapter}:${addr.verseDiapason}`;

        const chapteri = +addr.chapter - 1;
        if (checkIsNaN(chapteri)) return addr.$0;

        const fromVersei = +addr.verseFrom - 1;
        const fullBibleTitle = takeBibleLangBooks(langi)[booki]?.full || bookTitle;
        let text = `\n${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}${addr.verseTo ? `-${addr.verseTo}` : ''} ${tNameUpper} (${translateDescriptions[tName]})`;

        if (addr.verseTo) {
          const toVersei = +addr.verseTo - 1;

          const verses = await bibleTBCVTranslatesIDB.tb.list
            .where('k')
            .between(
              bibleTbcvEncode(tName, booki, chapteri, fromVersei),
              bibleTbcvEncode(tName, booki, chapteri, toVersei + 1),
            )
            .toArray();

          if (verses.length) {
            isThereCorrectBibleText = true;

            if (isWithoutText) return text;
            for (let versei = 0; versei < verses.length; versei++) {
              text += `\n${versei + fromVersei + 1}. ${verses[versei].v}`;
            }

            return makeSafeText(text);
          }
        } else {
          const verse = await bibleTBCVTranslatesIDB.tb.list.get(bibleTbcvEncode(tName, booki, chapteri, fromVersei));

          if (verse) {
            isThereCorrectBibleText = true;

            return isWithoutText ? text : `${text}\n${makeSafeText(verse.v)}`;
          }
        }

        const book = await bibleTBCVTranslatesIDB.tb.list
          .where('k')
          .startsWith(makeBibleTbcvPrefix(tName, booki))
          .first();

        if (checkIsNil(book))
          return `\n${tNameUpper}:<КНИГИ "${fullBibleTitle}" В ПЕРЕВОДЕ ${tNameUpper} ${translateDescriptions[tName] || ''} НЕТ> ${addr.chapter}:${addr.verseDiapason}`;

        const chapter = await bibleTBCVTranslatesIDB.tb.list
          .where('k')
          .startsWith(makeBibleTbcvPrefix(tName, booki, chapteri))
          .first();

        if (!chapter) return `\n${tNameUpper}:${fullBibleTitle} <${addr.chapter} ГЛАВЫ НЕТ>:${addr.verseDiapason}`;

        if (!isWithoutText) {
          const fromVerse = await bibleTBCVTranslatesIDB.tb.list.get(
            bibleTbcvEncode(tName, booki, chapteri, fromVersei),
          );

          if (checkIsNaN(fromVersei) || !fromVerse) {
            return `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom} СТИХА НЕТ>${addr.verseTail || ''}`;
          }

          if (checkIsNotNil(addr.verseTo)) {
            const toVersei = +addr.verseTo - 1;
            const toVerse = await bibleTBCVTranslatesIDB.tb.list.get(bibleTbcvEncode(tName, booki, chapteri, toVersei));

            if (checkIsNaN(toVersei) || !toVerse)
              return `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:${addr.verseFrom}-<${addr.verseTo} СТИХА НЕТ>`;

            if (toVersei <= fromVersei)
              return `\n${tNameUpper}:${fullBibleTitle} ${addr.chapter}:<${addr.verseFrom}${addr.verseTail || ''} ОШИБКА ДИАПАЗОНА>`;
          }
        }

        return '';
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
