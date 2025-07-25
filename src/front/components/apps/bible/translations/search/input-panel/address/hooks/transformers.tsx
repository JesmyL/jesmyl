import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { bibleIDB } from '$bible/basis/lib/bibleIDB';
import { bibleLowerBooks, checkEachBibleTitles } from '$bible/basis/lib/const/bibleTitles';
import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { useSetBibleAddressIndexes } from '$bible/basis/lib/hooks/address/address';
import { useBibleBookList } from '$bible/basis/lib/hooks/texts';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/basis/model/base';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { makeNamedRegExp, makeRegExp } from 'regexpert';
import { emptyFunc, transcriptEnToRuText } from 'shared/utils';

export const useBibleTransformAddressTermToAddress = (
  term: string,
  inputRef: React.RefObject<HTMLInputElement | null>,
) => {
  const books = useBibleBookList();
  const chapters = useBibleTranslatesContext().rst?.chapters;
  const [address, setAddress] = useState<ReactNode>(null);
  const onEnterPressRef = useRef(emptyFunc);
  const setAddressIndexes = useSetBibleAddressIndexes();

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
    if (chapters === undefined || term.length < 1) return;

    const match = term.toLowerCase().match(addressReg);

    if (match === null) return;

    const chips = makePropsFromAddressArgs(match);

    const chapterNumberi = chips.chapter === undefined ? 0 : ((+chips.chapter - 1) as BibleChapteri);
    let verseNumber = (chips.verse === undefined ? 1 : (+chips.verse as BibleVersei)) || 1;
    const finishVerseNumber = chips.finishVerse === undefined ? undefined : +chips.finishVerse;

    let booki = BibleBooki.none;

    const ruBookName = chips.bookName ?? transcriptEnToRuText(chips.bookNameEn ?? '');
    const bookTitle = `${chips.bookNum}${ruBookName}`;

    if (booki < 0) booki = bibleLowerBooks.findIndex(book => checkEachBibleTitles(book, title => title === bookTitle));
    if (booki < 0)
      booki = bibleLowerBooks.findIndex(book => checkEachBibleTitles(book, title => title.startsWith(bookTitle)));
    if (booki < 0)
      booki = bibleLowerBooks.findIndex(book => checkEachBibleTitles(book, title => title.includes(bookTitle)));
    if (booki < 0 && ruBookName.length > 1) {
      const bookTitleRegStr =
        `/^${chips.bookNum}${ruBookName[0]}[а-яё]?${ruBookName[1]}[а-яё]?${ruBookName.slice(2)}[а-яё]*$/` as const;

      booki = bibleLowerBooks.findIndex(book =>
        checkEachBibleTitles(book, title => !!title.match(makeRegExp(bookTitleRegStr))),
      );
    }
    if (booki < 0) booki = 0;

    const bookNameNode = booki === 0 ? <span className="color--7">{books[booki].full}</span> : books[booki].full;

    let chapterNode: ReactNode = chapterNumberi + 1;
    let verseNode: ReactNode = verseNumber;
    let finishVerseNode: ReactNode = finishVerseNumber;

    if (chapters[booki] == null) return;
    const book = chapters[booki]!;

    do {
      const isChapterOverOfBookLength = chapterNumberi >= book.length;

      if (isChapterOverOfBookLength) {
        chapterNode = <span className="color--ko">{chapterNumberi + 1}</span>;
        verseNode = <span className="color--ko">{verseNumber}</span>;
        if (finishVerseNumber !== undefined) finishVerseNode = <span className="color--ko">{finishVerseNumber}</span>;

        onEnterPressRef.current = emptyFunc;

        break;
      }

      const chapterLength = book[chapterNumberi]?.length ?? 0;
      const isFinishVerseOverOfCurrentChapter = finishVerseNumber !== undefined && finishVerseNumber > chapterLength;

      if (isFinishVerseOverOfCurrentChapter) {
        finishVerseNode = <span className="color--ko">{finishVerseNumber}</span>;

        onEnterPressRef.current = emptyFunc;

        break;
      }

      const isVerseOverOfChapter = verseNumber > chapterLength;
      const isFinishVerseLessThenStartVerse = finishVerseNumber !== undefined && finishVerseNumber <= verseNumber;
      const isVerseDiapasonIncorrect = isVerseOverOfChapter || isFinishVerseLessThenStartVerse;

      if (isVerseDiapasonIncorrect) {
        verseNode = <span className="color--ko">{verseNumber}</span>;
        if (finishVerseNumber !== undefined) finishVerseNode = <span className="color--ko">{finishVerseNumber}</span>;

        verseNumber = 1;
      }

      onEnterPressRef.current = () => {
        if (finishVerseNumber === undefined) {
          setAddressIndexes(booki, chapterNumberi, verseNumber - 1);
          bibleIDB.set.joinAddress(null);
        } else {
          const arrLen = finishVerseNumber - verseNumber + 1;

          setAddressIndexes(booki, chapterNumberi, finishVerseNumber - 1);
          bibleIDB.set.joinAddress({
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
    } while (disable);

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
  }, [books, chapters, setAddressIndexes, term]);

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
  `/(?<bookNum>\\d?)(?:-?[ея]?)?\\s*(?:(?<bookName>[а-яё]+)|(?<bookNameEn>[a-z]*))\\s*(?:(?<chapter>\\d{1,3})(?:(?::|\\s+)(?<verse>\\d{1,3})(?:\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerse>\\d{1,3})?)?)?/`,
);

const disable = false;
