import { bibleTbcvDecode, makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { BibleBooki, BibleBroadcastSingleAddress, BibleChapteri } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { makeRegExp } from 'regexpert';
import { BibleTranslateName } from 'shared/model/bible';
import { transcriptEnToRuText } from 'shared/utils/ru-en-letters';
import { internationalWordRegInnerLazy } from 'shared/utils/searchRate';
import { textToLowerCase } from 'shared/utils/string.utils';
import { BibleBroadcastSearchResponse, IBibleBroadcastSearchRequest } from './model';

const sortStringsByLength = (a: string, b: string) => b.length - a.length;

const bibleTexts: PRecord<BibleTranslateName, string[][][]> = {};
const takebibleChapters = async (tName: BibleTranslateName) => {
  if (bibleTexts[tName]) return bibleTexts[tName];

  const books = (bibleTexts[tName] ??= []);
  const verses = await bibleTBCVTranslatesIDB.tb.list.where('k').startsWith(makeBibleTbcvPrefix(tName)).toArray();

  verses.forEach(({ k, v: verse }) => {
    const { booki, chapteri, versei } = bibleTbcvDecode(k);
    ((books[booki] ??= [])[chapteri] ??= [])[versei] = verse;
  });

  return books;
};

self.onmessage = async (event: MessageEvent<IBibleBroadcastSearchRequest>) => {
  const {
    term: searchTerm,
    booki: currentBooki,
    chapteri: currentChapteri,
    listenScope,
    maxItems,
    showTranslates,
  } = event.data;

  const [tName = BibleTranslateName.rst, secondTName] = showTranslates;

  const lowerTerm = textToLowerCase(searchTerm.trim());

  let transcriptedRegWords, lowerRegWords;

  const mkReg = (text: string) =>
    text.split(makeRegExp('/ +/')).map(word => internationalWordRegInnerLazy()(word, false, word.length < 3));

  const transcriptedWordRegs = (transcriptedRegWords = mkReg(transcriptEnToRuText(lowerTerm))).map(regInner =>
    makeRegExp(`/${regInner}/i`),
  );

  const lowerWordRegs = (lowerRegWords = mkReg(lowerTerm)).map(regInner => makeRegExp(`/${regInner}/i`));

  const splitReg = `/(${transcriptedRegWords.concat(lowerRegWords).sort(sortStringsByLength).join('|')})/gi` as const;

  const founds: BibleBroadcastSingleAddress[][][] = [];
  let maxFound = 0;

  const searchInChapter = (booki: BibleBooki, chapteri: BibleChapteri, chapter: string[]) => {
    for (let versei = 0; versei < chapter.length; versei++) {
      const verse = chapter[versei];
      let foundWordsCount = -1;
      let foundWordi = 0;

      for (const lowerWordi in lowerWordRegs) {
        const match = verse.match(lowerWordRegs[lowerWordi]) || verse.match(transcriptedWordRegs[lowerWordi]);

        if (match) {
          foundWordsCount++;
          if (match.index) foundWordi = Math.max(foundWordi, match.index * +lowerWordi);
        }
      }

      if (foundWordsCount > -1) {
        ((founds[foundWordsCount] ??= [])[foundWordi] ??= []).push([booki, chapteri, versei]);

        if (lowerWordRegs.length === foundWordsCount) maxFound++;
        if (maxFound > maxItems) break;
      }
    }
  };

  const search = (lowerChapters: string[][][]) => {
    if (listenScope === BibleBroadcastKeyListenScope.SearchInText) {
      bibleSearchLoop: for (let booki = 0; booki < lowerChapters.length; booki++) {
        const book = lowerChapters[booki];
        if (book == null) continue;

        for (let chapteri = 0; chapteri < book.length; chapteri++) {
          searchInChapter(booki, chapteri, book[chapteri]);
          if (maxFound > maxItems) break bibleSearchLoop;
        }
      }
    } else {
      searchInChapter(currentBooki, currentChapteri, lowerChapters[currentBooki]?.[currentChapteri] ?? []);
    }
  };

  search(await takebibleChapters(tName));
  if (secondTName && maxFound < maxItems) search(await takebibleChapters(secondTName));

  const list = founds
    .reverse()
    .flat(2)
    .slice(0, maxItems + 1);

  const postEvent: BibleBroadcastSearchResponse = { list, splitReg };
  self.postMessage(postEvent);
};

export {};
