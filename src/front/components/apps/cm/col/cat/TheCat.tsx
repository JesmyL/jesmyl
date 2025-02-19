import { useAtomValue } from '#shared/lib/atom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import {
  PhaseContainerConfigurer,
  StyledPhaseContainerConfigurerContent,
  StyledPhaseContainerConfigurerHead,
} from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { LoadIndicatedContent } from '../../../../../shared/ui/LoadIndicatedContent';
import { cmIDB } from '../../_db/cm-idb';
import { SetComListLimitsExtracterContext } from '../../base/SetComListLimitsExtracterContext';
import { CmTranslationComListContextInCat } from '../../base/translations/InCat';
import { CmTranslationComListContextInZeroCat } from '../../base/translations/InZeroCat';
import { useLaterComList } from '../../base/useLaterComList';
import { categoryTermAtom, CmComListSearchFilterInput } from '../../complect/ComListSearchFilterInput';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { Com } from '../com/Com';
import { ComFaceList } from '../com/face/list/ComFaceList';
import { useCcat } from './useCcat';

export function TheCat({ all }: { all?: boolean; catWid?: number }) {
  const cat = useCcat(all);
  const { laterComws } = useLaterComList();
  const term = useAtomValue(categoryTermAtom);
  const [searchedComs, setSearchedComs] = useState<Com[]>([]);
  const setComListLimitsExtracterRef = useRef<(start: number | nil, finish: number | nil) => void>(emptyFunc);
  const fullComsCount = useLiveQuery(() => cmIDB.db.coms.count());
  const comsCount = all ? fullComsCount : cat?.comws.length ?? 0;

  useEffect(() => {
    if (term.length !== 1) return;
    setComListLimitsExtracterRef.current(0, 50);
  }, [term.length]);

  const listRef = useRef<HTMLDivElement>(null);
  const categoryTitleRef = useRef<HTMLDivElement>(null);

  const limitedComs = useMemo(() => {
    if (!term.length) return searchedComs;

    return searchedComs?.slice(0, 30);
  }, [searchedComs, term.length]);

  return (
    <Routes>
      <Route
        index
        element={
          <LoadIndicatedContent isLoading={!cat}>
            <StyledCatPhaseContainer
              className="cat-content"
              withoutBackButton={all}
              headClass="flex between full-width"
              head={
                <CmComListSearchFilterInput
                  Constructor={Com}
                  onDebounced={() => {
                    if (listRef.current) listRef.current.scrollTop = 0;
                  }}
                  onSearch={setSearchedComs}
                  showComwList={all ? undefined : cat?.comws}
                />
              }
              contentRef={listRef}
              content={
                cat && (
                  <>
                    {all && !term && !!laterComws?.length && (
                      <div
                        key="later-com-list"
                        className="later-com-list"
                      >
                        <div className="list-title sticky">Последние:</div>
                        <ComFaceList
                          list={laterComws}
                          isPutCcomFaceOff
                        />
                      </div>
                    )}
                    <div
                      className="flex between sticky list-title"
                      ref={categoryTitleRef}
                    >
                      <div>{cat.name}:</div>
                      {searchedComs && (
                        <div>
                          {comsCount === searchedComs.length ? '' : `${searchedComs.length} / `}
                          {comsCount}
                        </div>
                      )}
                    </div>
                    <div className="com-list">
                      <SetComListLimitsExtracterContext.Provider value={setComListLimitsExtracterRef}>
                        <ComFaceList list={limitedComs} />
                      </SetComListLimitsExtracterContext.Provider>
                    </div>
                  </>
                )
              }
            />
          </LoadIndicatedContent>
        }
      />

      {cmCompositionRoute(children => {
        const Context = all ? CmTranslationComListContextInZeroCat : CmTranslationComListContextInCat;
        return <Context>{children}</Context>;
      })}
    </Routes>
  );
}

const StyledCatPhaseContainer = styled(PhaseContainerConfigurer)`
  .list-title {
    cursor: ns-resize;
  }

  ${StyledPhaseContainerConfigurerHead} {
    width: 100%;
  }

  ${StyledPhaseContainerConfigurerContent} {
    padding-top: 0;
  }

  .later-com-list {
    &.hidden {
      display: none;
    }
  }

  .com-list {
    min-height: 110%;
  }
`;
