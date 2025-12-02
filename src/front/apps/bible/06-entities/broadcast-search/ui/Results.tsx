import { useBibleTranslatesContext } from '$bible/shared/contexts/translates';
import { useBibleAddressBooki, useBibleAddressChapteri } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { BibleBooki, BibleBroadcastSingleAddress, BibleChapteri, BibleVersei } from '$bible/shared/model/base';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { JSX, useCallback, useEffect, useState } from 'react';
import { escapeRegExpSymbols, makeRegExp } from 'regexpert';
import { transcriptEnToRuText } from 'shared/utils';
import styled from 'styled-components';
import { useBibleBroadcastSearchResultSelectedValue, useBibleBroadcastSearchSearchResultList } from '../lib/results';
import { bibleBroadcastSearchTermAtom, bibleBroadcastSearchZoneAtom } from '../state/atoms';
import { BibleBroadcastSearchResultVerse } from './ResultVerse';

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
  height?: string;
  innerZone: 'book' | 'chapter';
  onClick?: (booki: BibleBooki, chapteri: BibleChapteri, versei: BibleVersei) => void;
}

const mapWordsReplaceYoLetter = (word: string) => escapeRegExpSymbols(word).replace(makeRegExp('/[ёе]/g'), '[её]');
const mapRetArrFunc = (): BibleBroadcastSingleAddress[] => [];
const getSplitReg = (lowerWords: string[]) =>
  makeRegExp(`/(${lowerWords.map(mapWordsReplaceYoLetter).sort(sortStringsByLength).join('|')})/gi`);

const maxItems = 49;

const sortStringsByLength = (a: string, b: string) => b.length - a.length;

export function BibleBroadcastSearchResults({ inputRef, height = '100px', innerZone, onClick: userOnClick }: Props) {
  const searchZone = useAtomValue(bibleBroadcastSearchZoneAtom);
  const searchTerm = useAtomValue(bibleBroadcastSearchTermAtom);
  const showTranslates = useBibleShowTranslatesValue();
  const lowerChapters = useBibleTranslatesContext()[showTranslates[0]]?.lowerChapters;
  const [list, setList] = useState<JSX.Element[]>([]);
  const resultSelected = useBibleBroadcastSearchResultSelectedValue();
  const [resultList, setResultList] = useBibleBroadcastSearchSearchResultList();
  const onClick = useCallback(() => inputRef.current?.focus(), [inputRef]);

  let currentBooki = useBibleAddressBooki();
  let currentChapteri = useBibleAddressChapteri();
  if (searchZone === 'global') {
    currentBooki = BibleBooki.none;
    currentChapteri = BibleChapteri.none;
  }

  useEffect(() => {
    if (lowerChapters === undefined || searchTerm.trim().length < 3) return;
    const freeTerm = searchTerm.trim();
    if (freeTerm.length < 3) return;

    const lowerTerm = freeTerm.trim().toLowerCase();
    const transcriptedWords = transcriptEnToRuText(lowerTerm).split(makeRegExp('/ +/'));
    const lowerWords = lowerTerm.split(makeRegExp('/ +/'));

    const founds = Array(lowerWords.length).fill(0).map(mapRetArrFunc);
    const splitReg = getSplitReg(lowerWords);
    const lastFounds = founds[founds.length - 1];

    const searchInChapter = (booki: BibleBooki, chapteri: BibleChapteri, chapter: string[]) => {
      for (let versei = 0; versei < chapter.length; versei++) {
        const verse = chapter[versei];
        let foundWordsCount = -1;

        for (const lowerWordi in lowerWords) {
          if (verse.includes(lowerWords[lowerWordi]) || verse.includes(transcriptedWords[lowerWordi]))
            foundWordsCount++;
        }

        if (foundWordsCount > -1) {
          founds[foundWordsCount].push([booki, chapteri, versei]);

          if (lastFounds.length > maxItems) break;
        }
      }
    };

    if (searchZone === 'global')
      bibleSearchLoop: for (let booki = 0; booki < lowerChapters.length; booki++) {
        const book = lowerChapters[booki];
        if (book == null) continue;

        for (let chapteri = 0; chapteri < book.length; chapteri++) {
          searchInChapter(booki, chapteri, book[chapteri]);
          if (lastFounds.length > maxItems) break bibleSearchLoop;
        }
      }
    else {
      if (innerZone === 'book') {
        const book = lowerChapters[currentBooki];
        if (book != null)
          for (let chapteri = 0; chapteri < book.length; chapteri++) {
            searchInChapter(currentBooki, chapteri, book[chapteri]);
            if (lastFounds.length > maxItems) break;
          }
      } else searchInChapter(currentBooki, currentChapteri, lowerChapters[currentBooki]?.[currentChapteri] ?? []);
    }

    const list = founds
      .reverse()
      .flat()
      .slice(0, maxItems + 1);

    setResultList(list);

    setList(
      list.map(([booki, chapteri, versei], resulti) => (
        <BibleBroadcastSearchResultVerse
          key={booki + ' ' + chapteri + ' ' + versei}
          booki={booki}
          chapteri={chapteri}
          versei={versei}
          splitReg={splitReg}
          resulti={resulti}
          onClick={userOnClick}
        />
      )),
    );
  }, [currentBooki, currentChapteri, innerZone, lowerChapters, searchTerm, searchZone, setResultList, userOnClick]);

  useEffect(() => {
    if (resultSelected === null || resultList[resultSelected] == null) return;
    const [booki, chapteri, versei] = resultList[resultSelected];
    const node = document.getElementById(`bible-search-result-${booki}-${chapteri}-${versei}`);
    bibleJoinAddressAtom.set(null);
    if (node === null) return;
    node.scrollIntoView({ block: 'nearest' });

    node.classList.add('selected');
    return () => node.classList.remove('selected');
  }, [resultList, resultSelected]);

  return (
    <List
      $height={height}
      onClick={onClick}
    >
      {list}
    </List>
  );
}

const List = styled.div<{ $height: string }>`
  height: ${props => props.$height};
  overflow-y: auto;
  overflow-x: hidden;

  .bible-search-result.selected {
    background-color: var(--color--2);
    color: var(--color--3);
  }
`;
