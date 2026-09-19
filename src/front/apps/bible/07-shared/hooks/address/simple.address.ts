import { takeBibleTranslateBookSizesAtom } from '$bible/shared/lib/takeBibleTranslateBookSizesAtom';
import { BibleBooki, BibleChapteri, BibleSingleAddressCode, BibleVersei } from '$bible/shared/model/base';
import { bibleBookiAtom, bibleChapteriAtom, bibleShowTranslatesAtom, bibleVerseiAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { BibleTranslateName } from 'shared/model/bible';
import { checkIsNotNil } from 'shared/utils/checkIs';

export const useBibleSimpleCheckedSingleAddress = () => {
  const tName = useAtomValue(bibleShowTranslatesAtom)[0];
  const currentBooki = useAtomValue(bibleBookiAtom);
  const currentChapteri = useAtomValue(bibleChapteriAtom);
  const currentVersei = useAtomValue(bibleVerseiAtom);

  return takeBibleSimpleCheckedSingleAddress(tName, currentBooki, currentChapteri, currentVersei);
};

export const takeBibleSimpleCheckedSingleAddress = (
  tName: BibleTranslateName | null,
  topBooki: BibleBooki | null,
  topChapteri: BibleChapteri | null,
  topVersei: BibleVersei | null,
) => {
  topBooki ??= bibleBookiAtom.get();
  topChapteri ??= bibleChapteriAtom.get();
  topVersei ??= bibleVerseiAtom.get();

  const book = takeBibleTranslateBookSizesAtom(tName ?? bibleShowTranslatesAtom.get()[0]).get()[topBooki];

  const chapteri: BibleChapteri =
    topChapteri < 0 ? 0 : checkIsNotNil(book) && topChapteri > book.length - 1 ? book.length - 1 : topChapteri;

  const chapterLen = book?.[chapteri];

  const versei: BibleVersei =
    topVersei < 0 ? 0 : checkIsNotNil(chapterLen) && topVersei > chapterLen - 1 ? chapterLen - 1 : topVersei;

  return [topBooki, chapteri, versei] as BibleSingleAddressCode;
};
