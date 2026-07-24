import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { findIndexInBibleTitles, takeBibleLangBooks } from '$bible/shared/const/bibleTitles';
import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import { bibleAddressIndexesUpdate } from '$bible/shared/hooks';
import { BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleJoinAddressAtom, useBibleCurrentLangi } from '$bible/shared/state/atoms';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { makeNamedRegExp, makeRegExp } from 'regexpert';
import { Do } from 'shared/enums';
import { BibleTitleCodei } from 'shared/model/bible/enums';
import { emptyFunc } from 'shared/utils';
import { checkIsUndefined } from 'shared/utils/checkIs';
import { ruLowerLettersStr } from 'shared/utils/cm/com/const';
import { objectKeys } from 'shared/utils/object.utils';
import { transcriptEnToRuText } from 'shared/utils/ru-en-letters';

export const useBibleBroadcastSearchTransformAddressTermToAddress = (
  term: string,
  inputRef: React.RefObject<HTMLInputElement | null>,
) => {
  const translates = useBibleTranslatesContext();
  const chapters = translates.rst?.chapters ?? translates[objectKeys(translates)[0]]?.chapters;
  const [address, setAddress] = useState<ReactNode>(null);
  const onEnterPressRef = useRef(emptyFunc);
  const langi = useBibleCurrentLangi();

  useEffect(() => {
    if (inputRef.current === null) return;
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputRef.current, 'keydown', event => {
          if (event.code !== 'Enter') return;

          onEnterPressRef.current();
          inputRef.current?.blur();
        }),
      )
      .effect();
  }, [inputRef]);

  useEffect(() => {
    if (checkIsUndefined(chapters) || term.length < 1) return;

    const match = transcriptEnToRuText(term).match(addressReg) ?? term.toLowerCase().match(addressReg);

    if (!match?.[0]) return;

    const chips = makePropsFromAddressArgs(match);

    const chapterNumberi = checkIsUndefined(chips.chapter) ? 0 : ((+chips.chapter - 1) as BibleChapteri);
    let verseNumber = (checkIsUndefined(chips.verse) ? 1 : (+chips.verse as BibleVersei)) || 1;
    const finishVerseNumber = checkIsUndefined(chips.finishVerse) ? undefined : +chips.finishVerse;

    let booki = -1 as BibleTitleCodei;

    const ruBookName = chips.bookName ?? transcriptEnToRuText(chips.bookNameEn ?? '');
    const bookTitle = `${chips.bookNum}${ruBookName}`;

    if (booki < 0) booki = findIndexInBibleTitles(langi, title => title === bookTitle);
    if (booki < 0) booki = findIndexInBibleTitles(langi, title => title.startsWith(bookTitle));
    if (booki < 0) booki = findIndexInBibleTitles(langi, title => title.includes(bookTitle));
    if (booki < 0 && ruBookName.length > 1) {
      const bookTitleRegStr =
        `/^${chips.bookNum}${ruBookName[0]}[${ruLowerLettersStr}]?${ruBookName[1]}[${ruLowerLettersStr}]?${ruBookName.slice(2)}[${ruLowerLettersStr}]*$/` as const;

      booki = findIndexInBibleTitles(langi, title => !!title.match(makeRegExp(bookTitleRegStr)));
    }
    if (booki < 0) booki = 0;

    const bookNameNode =
      booki === 0 ? (
        <span className="text-x7">{takeBibleLangBooks(langi)[booki].full}</span>
      ) : (
        takeBibleLangBooks(langi)[booki].full
      );

    let chapterNode: ReactNode = chapterNumberi + 1;
    let verseNode: ReactNode = verseNumber;
    let finishVerseNode: ReactNode = finishVerseNumber;

    if (chapters[booki] == null) return;
    const book = chapters[booki]!;

    do {
      const isChapterOverOfBookLength = chapterNumberi >= book.length;

      if (isChapterOverOfBookLength) {
        chapterNode = <span className="text-xKO">{chapterNumberi + 1}</span>;
        verseNode = <span className="text-xKO">{verseNumber}</span>;
        if (finishVerseNumber !== undefined) finishVerseNode = <span className="text-xKO">{finishVerseNumber}</span>;

        onEnterPressRef.current = emptyFunc;

        break;
      }

      const chapterLength = book[chapterNumberi]?.length ?? 0;
      const isFinishVerseOverOfCurrentChapter = finishVerseNumber !== undefined && finishVerseNumber > chapterLength;

      if (isFinishVerseOverOfCurrentChapter) {
        finishVerseNode = <span className="text-xKO">{finishVerseNumber}</span>;

        onEnterPressRef.current = emptyFunc;

        break;
      }

      const isVerseOverOfChapter = verseNumber > chapterLength;
      const isFinishVerseLessThenStartVerse = finishVerseNumber !== undefined && finishVerseNumber <= verseNumber;
      const isVerseDiapasonIncorrect = isVerseOverOfChapter || isFinishVerseLessThenStartVerse;

      if (isVerseDiapasonIncorrect) {
        verseNode = <span className="text-xKO">{verseNumber}</span>;
        if (finishVerseNumber !== undefined) finishVerseNode = <span className="text-xKO">{finishVerseNumber}</span>;

        verseNumber = 1;
      }

      onEnterPressRef.current = () => {
        if (finishVerseNumber === undefined) {
          bibleAddressIndexesUpdate(booki, chapterNumberi, verseNumber - 1);
          bibleJoinAddressAtom.set(null);
        } else {
          const arrLen = finishVerseNumber - verseNumber + 1;

          bibleAddressIndexesUpdate(booki, chapterNumberi, finishVerseNumber - 1);
          bibleJoinAddressAtom.set({
            [booki]: {
              [chapterNumberi]:
                chips.verseSeparator?.trim() === ','
                  ? [verseNumber - 1, finishVerseNumber - 1]
                  : Array(arrLen < 0 ? 0 : arrLen)
                      .fill(0)
                      .map((_, i) => i + verseNumber - 1),
            },
          } as never);
        }
      };
    } while (Do.Not);

    const address = (
      <>
        {bookNameNode} {chapterNode}:{verseNode}
        {finishVerseNode === undefined ? null : (
          <>
            {chips.verseSeparator?.trim() === ',' ? ',' : '-'}
            {finishVerseNode}
          </>
        )}
      </>
    );

    setAddress(address);
  }, [chapters, langi, term]);

  return address;
};

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
// region: UTILS
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

const { regExp: addressReg, transform: makePropsFromAddressArgs } = makeNamedRegExp(
  `/(?<bookNum>\\d?)(?:-?[ея]?)?\\s*(?:(?<bookName>[${ruLowerLettersStr}]+)|(?<bookNameEn>[a-z]*))\\s*(?:(?<chapter>\\d{1,3})(?:(?::|\\s+)(?<verse>\\d{1,3})(?:\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerse>\\d{1,3})?)?)?/`,
);
