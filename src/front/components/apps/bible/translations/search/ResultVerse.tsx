import { useBibleTranslatesContext } from '$bible/basis/lib/contexts/translates';
import { useBibleTranslationAddressIndexesSetter } from '$bible/basis/lib/hooks/address/address';
import { useBibleBookList } from '$bible/basis/lib/hooks/texts';
import { useBibleShowTranslatesValue } from '$bible/basis/lib/hooks/translates';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/basis/model/base';
import { JSX, memo } from 'react';

interface Props {
  booki: BibleBooki;
  chapteri: BibleChapteri;
  versei: BibleVersei;
  splitReg: RegExp;
  resulti: number;
  onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void;
}

export const BibleSearchResultVerse = memo(function BibleSearchResultVerse({
  booki,
  chapteri,
  versei,
  splitReg,
  resulti,
  onClick,
}: Props): JSX.Element {
  const showTranslates = useBibleShowTranslatesValue();
  const books = useBibleBookList();
  const textBits =
    useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[booki]?.[chapteri]?.[versei]?.split(splitReg);
  const addressSetter = useBibleTranslationAddressIndexesSetter();

  return (
    <div
      id={`bible-search-result-${booki}-${chapteri}-${versei}`}
      className="bible-search-result pointer mt-2 flex"
      onClick={addressSetter(booki, chapteri, versei, resulti, onClick)}
    >
      <span className="text-x3 mr-2 nowrap">
        {books[booki].short} {chapteri + 1} {versei + 1}
      </span>
      <span>
        {textBits?.map((__html, biti) => {
          return (
            <span
              key={biti}
              className={biti % 2 ? 'text-x7' : undefined}
              dangerouslySetInnerHTML={{ __html }}
            />
          );
        })}
      </span>
    </div>
  );
});
