import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LoadIndicatedContent } from '#shared/ui/load-indicated-content/LoadIndicatedContent';
import {
  PageContainerConfigurer,
  StyledPhaseContainerConfigurerContent,
  StyledPhaseContainerConfigurerHead,
} from '#shared/ui/phase-container/PageContainerConfigurer';
import { CmCat } from '$cm/entities/cat';
import { CmCom, CmComWithComListSearchFilterInput } from '$cm/entities/com';
import {
  CmComAudioPlayer,
  cmComAudioPlayerHeaderStickyCss,
  cmComAudioPlayerPlaySrcAtom,
} from '$cm/entities/com-audio-player';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmComSetListLimitsExtracterContext } from '$cm/entities/index';
import { CmComRatingSortedComList } from '$cm/features/com';
import { FileRoutesByPath } from '@tanstack/react-router';
import { Atom, atom, useAtomValue } from 'atomaric';
import { ReactNode, useEffect, useRef } from 'react';
import { CmCatWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';

interface Props {
  cat: CmCat | und;
  topNodeRender?: (term: string) => ReactNode;
  comsCount: number;
  backButtonPath?: keyof FileRoutesByPath;
  withoutBackButton?: boolean;
  coms: CmCom[];
}

const isOpenRatingSortedComsAtom = atom(false);
const termAtoms: PRecord<CmCatWid, Atom<string>> = {};

export const CmCatPage = (props: Props) => {
  const termAtom = (termAtoms[props.cat?.wid ?? CmCatWid.def] ??= atom(
    '',
    `cm:comListSearch:${props.cat?.wid ?? CmCatWid.def}`,
  ));

  const term = useAtomValue(termAtom);
  const debouncedTerm = useDebounceValue(term);

  const setComListLimitsExtracterRef = useRef<(start: number | nil, finish: number | nil) => void>(emptyFunc);
  const listRef = useRef<HTMLDivElement>(null);
  const categoryTitleRef = useRef<HTMLDivElement>(null);
  const playComSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [debouncedTerm]);

  useEffect(() => {
    if (term.length !== 1) return;
    setComListLimitsExtracterRef.current(0, 50);
  }, [term.length]);

  return (
    <LoadIndicatedContent isLoading={!props.cat}>
      <CmComWithComListSearchFilterInput
        Constructor={CmCom}
        coms={props.coms}
        termAtom={termAtom}
      >
        {({ inputNode, catNumberSearch, limitedComs, foundComsLength }) => {
          return (
            <StyledCatPhaseContainer
              className="cat-content"
              withoutBackButton={props.withoutBackButton}
              headClass="flex between w-full"
              backButtonPath={props.backButtonPath}
              onMoreClick={isOpenRatingSortedComsAtom.do.toggle}
              head={inputNode}
              contentRef={listRef}
              content={
                props.cat && (
                  <>
                    {playComSrc && (
                      <CmComAudioPlayer
                        className="fixed top-[var(--header-height)] w-full z-20 -ml-[2px]"
                        audioLinks={[playComSrc]}
                      />
                    )}
                    {props.topNodeRender?.(term)}
                    <div
                      className="flex between sticky list-title"
                      ref={categoryTitleRef}
                    >
                      <div>{props.cat.name}:</div>
                      <div>
                        {props.comsCount === foundComsLength ? '' : `${foundComsLength} из `}
                        {props.comsCount}
                      </div>
                    </div>
                    <div className="com-list">
                      <CmComSetListLimitsExtracterContext
                        key={+!term}
                        value={setComListLimitsExtracterRef}
                      >
                        {catNumberSearch && (
                          <CmComFaceList
                            isPutCcomFaceOff={!!term}
                            list={catNumberSearch.comws}
                            comDescription={com => (
                              <div className="text-[.7em] absolute -bottom-[.5em] left-[64px] text-x7/50">
                                {catNumberSearch.descriptions[com.wid]}
                              </div>
                            )}
                          />
                        )}
                        <CmComFaceList
                          isPutCcomFaceOff={!!term}
                          list={limitedComs}
                        />
                      </CmComSetListLimitsExtracterContext>
                    </div>

                    <FullContent
                      openAtom={isOpenRatingSortedComsAtom}
                      closable
                      containerClassName="pt-0"
                    >
                      <div className="sticky top-0 py-5 bg-x5">Рейтинг</div>
                      <CmComRatingSortedComList coms={props.coms} />
                    </FullContent>
                  </>
                )
              }
            />
          );
        }}
      </CmComWithComListSearchFilterInput>
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

  ${cmComAudioPlayerHeaderStickyCss}
`;
