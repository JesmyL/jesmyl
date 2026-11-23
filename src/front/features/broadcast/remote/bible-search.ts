import { makeNamedRegExp, makeRegExp } from 'regexpert';
import { RemoteBroadcastBibleBook } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { ruLowerLettersStr } from 'shared/utils/cm/com/const';
import { transcriptEnToRuText } from 'shared/utils/ru-en-letters';
import { internationalWordRegInnerLazy } from 'shared/utils/searchRate';
import { textToLowerCase } from 'shared/utils/string.utils';
import { RemoteBroadcastBibleSearchAddress } from './model';

const { regExp: remoteBroadcastBibleAddressReg, transform: makeRemoteBroadcastBibleAddressArgs } = makeNamedRegExp(
  `/(?<bookNum>\\d?)(?:-?[ея]?)?\\s*(?:(?<bookName>[${ruLowerLettersStr}]+)|(?<bookNameEn>[a-z]*))\\s*(?:(?<chapter>\\d{1,3})(?:(?::|\\s+)(?<verse>\\d{1,3})(?:\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerse>\\d{1,3})?)?)?/`,
);

const takeRemoteBroadcastBibleBooki = (books: RemoteBroadcastBibleBook[], bookTitle: string) => {
  const checks = [
    (title: string) => title === bookTitle,
    (title: string) => title.startsWith(bookTitle),
    (title: string) => title.includes(bookTitle),
  ];

  for (const check of checks) {
    const booki = books.findIndex(book => check(book.short.toLowerCase()) || check(book.full.toLowerCase()));
    if (booki >= 0) return booki;
  }

  return null;
};

export const parseRemoteBroadcastBibleAddress = (
  term: string,
  books: RemoteBroadcastBibleBook[],
  bookSizes: (number[] | nil)[],
): RemoteBroadcastBibleSearchAddress | nil => {
  if (!term.trim()) return null;

  const match = transcriptEnToRuText(textToLowerCase(term)).match(remoteBroadcastBibleAddressReg);
  if (!match?.[0]) return null;

  const chips = makeRemoteBroadcastBibleAddressArgs(match);
  const ruBookName = chips.bookName ?? transcriptEnToRuText(textToLowerCase(chips.bookNameEn ?? ''));
  if (!ruBookName) return null;

  const booki = takeRemoteBroadcastBibleBooki(books, `${chips.bookNum}${ruBookName}`);
  if (booki == null) return null;

  const sizes = bookSizes[booki];
  if (sizes == null) return null;

  const chapteri = chips.chapter == null ? 0 : Number(chips.chapter) - 1;
  if (chapteri < 0 || chapteri >= sizes.length) return null;

  const versei = chips.verse == null ? 0 : Number(chips.verse) - 1;
  if (versei < 0 || versei >= sizes[chapteri]) return null;

  const finishVersei =
    chips.finishVerse == null ? null : Math.min(Number(chips.finishVerse) - 1, (sizes[chapteri] ?? 0) - 1);

  return { booki, chapteri, versei, finishVersei: finishVersei != null && finishVersei <= versei ? null : finishVersei };
};

export const takeRemoteBroadcastVersePlainText = (html: string) => html.replace(makeRegExp('/<[^>]*>/g'), ' ');

export const makeRemoteBibleWordRegs = (term: string) => {
  const lowerTerm = textToLowerCase(term.trim());
  const makeWordRegs = (text: string) =>
    text
      .split(makeRegExp('/ +/'))
      .map(word => makeRegExp(`/${internationalWordRegInnerLazy()(word, false, word.length < 3)}/i`));

  return {
    lowerWordRegs: makeWordRegs(lowerTerm),
    transcriptedWordRegs: makeWordRegs(transcriptEnToRuText(lowerTerm)),
  };
};

export const isRemoteBibleVerseSearchMatched = (
  html: string,
  searchWords: ReturnType<typeof makeRemoteBibleWordRegs>,
) => searchWords.lowerWordRegs.some((reg, wordi) => reg.test(html) || searchWords.transcriptedWordRegs[wordi]?.test(html));
