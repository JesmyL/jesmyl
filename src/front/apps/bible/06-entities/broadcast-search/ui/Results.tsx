import { bibleBroadcastSearchAreaConfigDict } from '$bible/shared/const';
import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import { bibleAddressIndexesUpdate, useBibleAddressBooki, useBibleAddressChapteri } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { BibleBooki, BibleBroadcastSingleAddress, BibleChapteri } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import {
  bibleBroadcastCurrentListLengthAtom,
  bibleBroadcastCurrentSelectedIndexAtom,
  bibleBroadcastKeyListenScopeAtom,
} from '$bible/shared/state';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { JSX, useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { BibleTitleCodei } from 'shared/model/bible/enums';
import { checkIsNil, checkIsUndefined } from 'shared/utils/checkIs';
import { lazyInit } from 'shared/utils/lazyInit';
import { arrayByLength } from 'shared/utils/object.utils';
import { transcriptEnToRuText } from 'shared/utils/ru-en-letters';
import { internationalWordRegInner } from 'shared/utils/searchRate';
import { bibleBroadcastSearchResultSelectedListAtom } from '../lib/results';
import { bibleBroadcastSearchTermAtom } from '../state/atoms';
import { BibleBroadcastSearchResultVerse } from './ResultVerse';

const mapRetArrFunc = (): BibleBroadcastSingleAddress[] => [];
const maxItems = 49;
const sortStringsByLength = (a: string, b: string) => b.length - a.length;

export const BibleBroadcastSearchResults = () => {
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);
  const searchTerm = useAtomValue(bibleBroadcastSearchTermAtom);
  const showTranslates = useBibleShowTranslatesValue();
  const lowerChapters = useBibleTranslatesContext()[showTranslates[0]]?.lowerChapters;
  const [list, setList] = useState<JSX.Element[]>([]);
  const selectedItemi = useAtomValue(bibleBroadcastCurrentSelectedIndexAtom);
  const resultList = useAtomValue(bibleBroadcastSearchResultSelectedListAtom);

  let currentBooki = useBibleAddressBooki();
  let currentChapteri = useBibleAddressChapteri();
  if (listenScope === BibleBroadcastKeyListenScope.SearchInText) {
    currentBooki = BibleTitleCodei.aБыт;
    currentChapteri = BibleChapteri.none;
  }

  useEffect(() => {
    if (
      listenScope !== BibleBroadcastKeyListenScope.SearchInChapter &&
      listenScope !== BibleBroadcastKeyListenScope.SearchInText
    ) {
      setList([]);
      return;
    }

    if (checkIsUndefined(lowerChapters) || searchTerm.trim().length < 3) return;
    const freeTerm = searchTerm.trim();
    if (freeTerm.length < 3) return;

    const lowerTerm = freeTerm.trim().toLowerCase();
    const transcriptedWordsLazy = lazyInit(() =>
      transcriptEnToRuText(lowerTerm)
        .split(makeRegExp('/ +/'))
        .map(word => internationalWordRegInner()(word, false)),
    );
    const lowerWords = lowerTerm.split(makeRegExp('/ +/')).map(word => internationalWordRegInner()(word, false));

    const founds = arrayByLength(lowerWords.length, mapRetArrFunc);
    const splitRegLazy = lazyInit(() =>
      makeRegExp(`/(${transcriptedWordsLazy().concat(lowerWords).sort(sortStringsByLength).join('|')})/gi`),
    );
    const lastFounds = founds[founds.length - 1];

    const searchInChapter = (booki: BibleBooki, chapteri: BibleChapteri, chapter: string[]) => {
      for (let versei = 0; versei < chapter.length; versei++) {
        const verse = chapter[versei];
        let foundWordsCount = -1;

        for (const lowerWordi in lowerWords) {
          if (verse.match(lowerWords[lowerWordi]) || verse.match(transcriptedWordsLazy()[lowerWordi]))
            foundWordsCount++;
        }

        if (foundWordsCount > -1) {
          founds[foundWordsCount].push([booki, chapteri, versei]);

          if (lastFounds.length > maxItems) break;
        }
      }
    };

    if (listenScope === BibleBroadcastKeyListenScope.SearchInText)
      bibleSearchLoop: for (let booki = 0; booki < lowerChapters.length; booki++) {
        const book = lowerChapters[booki];
        if (book == null) continue;

        for (let chapteri = 0; chapteri < book.length; chapteri++) {
          searchInChapter(booki, chapteri, book[chapteri]);
          if (lastFounds.length > maxItems) break bibleSearchLoop;
        }
      }
    else {
      searchInChapter(currentBooki, currentChapteri, lowerChapters[currentBooki]?.[currentChapteri] ?? []);
    }

    const list = founds
      .reverse()
      .flat()
      .slice(0, maxItems + 1);

    bibleBroadcastSearchResultSelectedListAtom.set(list);

    setList(
      list.map(([booki, chapteri, versei], resulti) => (
        <BibleBroadcastSearchResultVerse
          key={`${booki} ${chapteri} ${versei}`}
          booki={booki}
          chapteri={chapteri}
          versei={versei}
          splitRegLazy={splitRegLazy}
          resulti={resulti}
        />
      )),
    );
  }, [currentBooki, currentChapteri, lowerChapters, searchTerm, listenScope]);

  useEffect(() => {
    if (!(listenScope in bibleBroadcastSearchAreaConfigDict)) return;
    bibleBroadcastCurrentListLengthAtom.set(resultList.length + 1);

    const resultItem = resultList[selectedItemi - 1];
    if (checkIsNil(resultItem)) return;

    bibleAddressIndexesUpdate(...resultItem);

    const [booki, chapteri, versei] = resultItem;
    const node = document.getElementById(`bible-search-result-${booki}-${chapteri}-${versei}`);

    if (!node) return;

    bibleJoinAddressAtom.reset();
    node.scrollIntoView({ block: 'center', behavior: 'smooth' });

    node.classList.add('selected');
    return () => node.classList.remove('selected');
  }, [listenScope, resultList, selectedItemi]);

  return <List className="h-full overflow-y-auto overflow-x-hidden">{list}</List>;
};

const List = styled.div`
  .bible-search-result.selected {
    background-color: var(--color-x2);
    color: var(--color-x3);
  }
`;
