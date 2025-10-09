import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LoadIndicatedContent } from '#shared/ui/load-indicated-content/LoadIndicatedContent';
import {
  PageContainerConfigurer,
  StyledPhaseContainerConfigurerContent,
  StyledPhaseContainerConfigurerHead,
} from '#shared/ui/phase-container/PageContainerConfigurer';
import { SetComListLimitsExtracterContext } from '$cm/base/SetComListLimitsExtracterContext';
import { comPlayerHeaderStickyCss } from '$cm/basis/css/com-player';
import { comPlayerPlaySrcAtom } from '$cm/basis/lib/control/current-play-com';
import { Cat } from '$cm/col/cat/Cat';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { CmComListSearchFilterInput } from '$cm/features/CmComListSearchFilterInput';
import { CmRatingSortedComList } from '$cm/widgets/RatingSortedComList';
import { FileRoutesByPath } from '@tanstack/react-router';
import { Atom, atom, useAtomValue } from 'atomaric';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { CmCatWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import { Com } from '../col/com/Com';
import { ComFaceList } from '../col/com/face/list/ComFaceList';

interface Props {
  cat: Cat | und;
  topNodeRender?: (term: string) => ReactNode;
  comsCount: number;
  backButtonPath?: keyof FileRoutesByPath;
  withoutBackButton?: boolean;
  coms: Com[];
}

const isOpenRatingSortedComsAtom = atom(false);
const termAtoms: PRecord<CmCatWid, Atom<string>> = {};
const debounceTermAtoms: PRecord<CmCatWid, Atom<string>> = {};

export const CmCatPage = (props: Props) => {
  const termAtom = (termAtoms[props.cat?.wid ?? CmCatWid.def] ??= atom(''));
  const debounceTermAtom = (debounceTermAtoms[props.cat?.wid ?? CmCatWid.def] ??= atom(''));

  const term = useAtomValue(termAtom);
  const [searchedComs, setSearchedComs] = useState<Com[]>([]);
  const setComListLimitsExtracterRef = useRef<(start: number | nil, finish: number | nil) => void>(emptyFunc);
  const listRef = useRef<HTMLDivElement>(null);
  const categoryTitleRef = useRef<HTMLDivElement>(null);
  const debouncedTerm = useAtomValue(debounceTermAtom);
  const playComSrc = useAtomValue(comPlayerPlaySrcAtom);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [debouncedTerm]);

  useEffect(() => {
    if (term.length !== 1) return;
    setComListLimitsExtracterRef.current(0, 50);
  }, [term.length]);

  const limitedComs = useMemo(() => {
    if (!term.length) return searchedComs;

    return searchedComs?.slice(0, 30);
  }, [searchedComs, term.length]);

  return (
    <LoadIndicatedContent isLoading={!props.cat}>
      <StyledCatPhaseContainer
        className="cat-content"
        withoutBackButton={props.withoutBackButton}
        headClass="flex between w-full"
        backButtonPath={props.backButtonPath}
        onMoreClick={isOpenRatingSortedComsAtom.do.toggle}
        head={
          <CmComListSearchFilterInput
            Constructor={Com}
            onSearch={setSearchedComs}
            coms={props.coms}
            termAtom={termAtom}
          />
        }
        contentRef={listRef}
        content={
          props.cat && (
            <>
              {playComSrc && (
                <ComPlayer
                  className="fixed top-[var(--header-height)] w-full z-20"
                  audioLinks={[playComSrc]}
                />
              )}
              {props.topNodeRender?.(term)}
              <div
                className="flex between sticky list-title"
                ref={categoryTitleRef}
              >
                <div>{props.cat.name}:</div>
                {searchedComs && (
                  <div>
                    {props.comsCount === searchedComs.length ? '' : `${searchedComs.length} / `}
                    {props.comsCount}
                  </div>
                )}
              </div>
              <div className="com-list">
                <SetComListLimitsExtracterContext value={setComListLimitsExtracterRef}>
                  <ComFaceList
                    key={+!term}
                    isPutCcomFaceOff={!!term}
                    list={limitedComs}
                    {...props}
                  />
                </SetComListLimitsExtracterContext>
              </div>

              <FullContent openAtom={isOpenRatingSortedComsAtom}>
                <div className="sticky top-0 py-5 bg-x5">Рейтинг</div>
                <CmRatingSortedComList coms={props.coms} />
              </FullContent>
            </>
          )
        }
      />
    </LoadIndicatedContent>
  );
};

const StyledCatPhaseContainer = styled(PageContainerConfigurer)`
  .list-title {
    cursor: ns-resize;
  }

  ${StyledPhaseContainerConfigurerHead} {
    width: 100%;
  }

  ${StyledPhaseContainerConfigurerContent} {
    padding-top: 0;
    &:has(.composition-player) {
      margin-top: 30px;
      height: calc(var(--content-height) - 30px);
    }
  }

  .later-com-list {
    &.hidden {
      display: none;
    }
  }

  .com-list {
    min-height: 110%;
  }

  ${comPlayerHeaderStickyCss}
`;
