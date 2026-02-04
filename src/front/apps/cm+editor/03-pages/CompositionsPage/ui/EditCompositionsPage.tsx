import { StyledPhaseContainerConfigurerHead } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { CmEditorComListEditMore } from '$cm+editor/features/com';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import {
  CmComFaceList,
  CmComWithComListSearchFilterInput,
  CmEditorCompositionsCatSpecialSearches,
  useCmComList,
} from '$cm/ext';
import { useNavigate } from '@tanstack/react-router';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ICmEditorCompositionsCatSpecialSearches } from '../model';

let termAtom: Atom<string>;

export const CmEditorCompositionsPage = () => {
  termAtom ??= atom('');

  const coms = useCmComList();
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [mapper, setMapper] = useState<ICmEditorCompositionsCatSpecialSearches['map'] | null>(null);
  const term = useAtomValue(termAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, []);

  return (
    <>
      <CmComWithComListSearchFilterInput
        Constructor={EditableCom}
        termAtom={termAtom}
        comsMapper={mapper}
        coms={coms}
      >
        {({ inputNode, searchedComs, catNumberSearch }) => {
          return (
            <StyledPageCmEditorContainer
              className="edit-compositions"
              headClass="flex between w-full"
              head={inputNode}
              onMoreClick={setIsOpenMorePopup}
              contentRef={listRef}
              content={
                <>
                  {term.startsWith('@') && (
                    <CmEditorCompositionsCatSpecialSearches
                      term={term}
                      setTerm={termAtom.set}
                      setMapper={setMapper}
                    />
                  )}

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
                    key={+!term}
                    list={searchedComs}
                    isPutCcomFaceOff={!!term}
                    importantOnClick={({ com }) => {
                      navigate({
                        to: '/cm/edit/coms/$comw/$tab',
                        params: { comw: `${com.wid}`, tab: 'watch' },
                      });
                    }}
                  />
                </>
              }
            />
          );
        }}
      </CmComWithComListSearchFilterInput>
      {isOpenMorePopup && (
        <BottomPopup onClose={setIsOpenMorePopup}>
          <CmEditorComListEditMore onClose={setIsOpenMorePopup} />
        </BottomPopup>
      )}
    </>
  );
};

const StyledPageCmEditorContainer = styled(PageCmEditorContainer)`
  ${StyledPhaseContainerConfigurerHead} {
    width: 100%;
  }
`;
