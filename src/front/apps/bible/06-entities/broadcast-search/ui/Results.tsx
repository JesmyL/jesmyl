import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { bibleBroadcastSearchAreaConfigDict } from '$bible/shared/const';
import { useBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { BibleChapteri } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import {
  bibleBroadcastCurrentListLengthAtom,
  bibleBroadcastCurrentSelectedIndexAtom,
  bibleBroadcastKeyListenScopeAtom,
} from '$bible/shared/state';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { BibleTitleCodei } from 'shared/model/bible/enums';
import { checkIsNil } from 'shared/utils/checkIs';
import { bibleBroadcastSearchResultSelectedListAtom } from '../lib/results';
import { bibleBroadcastSearchTermAtom } from '../state/atoms';
import { BibleBroadcastSearchResponse, IBibleBroadcastSearchRequest } from './model';
import { BibleBroadcastSearchResultVerse } from './ResultVerse';
import BibleBroadcastSearchWorker from './worker?worker';

const worker = new BibleBroadcastSearchWorker();

const maxItems = 49;

export const BibleBroadcastSearchResults = () => {
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);
  const searchTerm = useAtomValue(bibleBroadcastSearchTermAtom);
  const showTranslates = useBibleShowTranslatesValue();
  const [splitReg, setSplitRegLazy] = useState<RegExp | null>(null);
  const selectedItemi = useAtomValue(bibleBroadcastCurrentSelectedIndexAtom);
  const resultList = useAtomValue(bibleBroadcastSearchResultSelectedListAtom);

  let [currentBooki, currentChapteri] = useBibleSimpleCheckedSingleAddress();

  if (listenScope === BibleBroadcastKeyListenScope.SearchInText) {
    currentBooki = BibleTitleCodei.aБыт;
    currentChapteri = BibleChapteri.none;
  }

  useEffect(() => {
    if (
      (listenScope !== BibleBroadcastKeyListenScope.SearchInChapter &&
        listenScope !== BibleBroadcastKeyListenScope.SearchInText) ||
      searchTerm.trim().length < 3
    ) {
      bibleBroadcastSearchResultSelectedListAtom.reset();
      return;
    }

    worker.onmessage = (event: MessageEvent<BibleBroadcastSearchResponse>) => {
      const { list, splitReg } = event.data;
      bibleBroadcastSearchResultSelectedListAtom.set(list);
      setSplitRegLazy(makeRegExp(splitReg));
    };

    const event: IBibleBroadcastSearchRequest = {
      booki: currentBooki,
      chapteri: currentChapteri,
      term: searchTerm,
      listenScope,
      showTranslates,
      maxItems,
    };
    worker.postMessage(event);
  }, [currentBooki, currentChapteri, searchTerm, listenScope, showTranslates]);

  useEffect(() => {
    if (!(listenScope in bibleBroadcastSearchAreaConfigDict)) return;
    bibleBroadcastCurrentListLengthAtom.set(resultList.length + 1);

    const resultItem = resultList[selectedItemi - 1];
    if (checkIsNil(resultItem)) return;
    const [booki, chapteri, versei] = resultItem;

    bibleBroadcastListSetSingleAddress(booki, chapteri, versei);

    const node = document.getElementById(`bible-search-result-${booki}-${chapteri}-${versei}`);

    if (!node) return;

    bibleJoinAddressAtom.reset();
    node.scrollIntoView({ block: 'center', behavior: 'smooth' });

    node.classList.add('selected');
    return () => node.classList.remove('selected');
  }, [listenScope, resultList, selectedItemi]);

  return (
    <StyledList className="h-full overflow-y-auto overflow-x-hidden">
      {splitReg &&
        resultList.map(([booki, chapteri, versei], resulti) => {
          return (
            <BibleBroadcastSearchResultVerse
              key={`${booki} ${chapteri} ${versei}`}
              booki={booki}
              chapteri={chapteri}
              versei={versei}
              splitReg={splitReg}
              resulti={resulti}
            />
          );
        })}
    </StyledList>
  );
};

const StyledList = styled.div`
  .bible-search-result.selected {
    background-color: var(--color-x2);
    color: var(--color-x3);
  }
`;
