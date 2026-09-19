import { translateDynamic } from '#basis/locale';
import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { bibleTbcvEncode } from '$bible/shared/lib/tbcv.parser';
import { useBibleCurrentLangi } from '$bible/shared/lib/useBibleCurrentLangi';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleBroadcastCurrentSelectedIndexAtom } from '$bible/shared/state';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { JSX, memo } from 'react';
import { makeRegExp } from 'regexpert';

interface Props {
  booki: BibleBooki;
  chapteri: BibleChapteri;
  versei: BibleVersei;
  splitReg: RegExp;
  resulti: number;
  onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void;
}

export const BibleBroadcastSearchResultVerse = memo(function BibleSearchResultVerse({
  booki,
  chapteri,
  versei,
  splitReg,
  resulti,
  onClick,
}: Props): JSX.Element {
  const showTranslates = useBibleShowTranslatesValue();
  const tName = showTranslates[0];
  const texts = useLiveQuery(
    () => bibleTBCVTranslatesIDB.tb.list.get(bibleTbcvEncode(tName, booki, chapteri, versei)),
    [tName, booki, chapteri, versei],
  );
  const textBits = texts?.v?.replace(makeRegExp('/</?.+?>/gi'), '').split(splitReg);
  const langi = useBibleCurrentLangi();

  return (
    <div
      id={`bible-search-result-${booki}-${chapteri}-${versei}`}
      className="bible-search-result pointer mt-2 flex"
      onClick={() => {
        bibleBroadcastListSetSingleAddress(booki, chapteri, versei);
        onClick?.(booki, chapteri, versei);
        bibleBroadcastCurrentSelectedIndexAtom.set(resulti + 1);
        bibleJoinAddressAtom.reset();
      }}
    >
      <span className="text-x3 mr-2 nowrap">
        {translateDynamic(langi)(it => it.bible.title.short[booki])} {chapteri + 1} {versei + 1}
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
