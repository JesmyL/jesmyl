import { translateDynamic } from '#basis/locale';
import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { BibleBooki, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleBroadcastCurrentSelectedIndexAtom } from '$bible/shared/state';
import { bibleJoinAddressAtom, useBibleCurrentLangi } from '$bible/shared/state/atoms';
import { JSX, memo } from 'react';

interface Props {
  booki: BibleBooki;
  chapteri: BibleChapteri;
  versei: BibleVersei;
  splitRegLazy: () => RegExp;
  resulti: number;
  onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void;
}

export const BibleBroadcastSearchResultVerse = memo(function BibleSearchResultVerse({
  booki,
  chapteri,
  versei,
  splitRegLazy,
  resulti,
  onClick,
}: Props): JSX.Element {
  const showTranslates = useBibleShowTranslatesValue();
  const textBits =
    useBibleTranslatesContext()[showTranslates[0]]?.chapters?.[booki]?.[chapteri]?.[versei]?.split(splitRegLazy());
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
