import { useBibleTranslationAddressIndexesSetter } from '@bible/hooks/address/address';
import { useBibleBookList } from '@bible/hooks/texts';
import { BibleBooki, BibleChapteri, BibleVersei } from '@bible/model';
import { useBibleShowTranslatesValue } from '@bible/translates/hooks';
import { useBibleTranslatesContext } from '@bible/translates/TranslatesContext';
import { memo } from 'react';

interface Props {
  booki: BibleBooki;
  chapteri: BibleChapteri;
  versei: BibleVersei;
  splitReg: RegExp;
  resulti: number;
  onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void;
}

export default memo(function BibleSearchResultVerse({
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
      className="bible-search-result pointer margin-gap-t flex"
      onClick={addressSetter(booki, chapteri, versei, resulti, onClick)}
    >
      <span className="color--3 margin-gap-r nowrap">
        {books[booki][1]} {chapteri + 1} {versei + 1}
      </span>
      <span>
        {textBits?.map((__html, biti) => {
          return (
            <span
              key={biti}
              className={biti % 2 ? 'color--7' : undefined}
              dangerouslySetInnerHTML={{ __html }}
            />
          );
        })}
      </span>
    </div>
  );
});
