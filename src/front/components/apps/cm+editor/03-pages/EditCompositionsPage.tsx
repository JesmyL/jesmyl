import { StyledPhaseContainerConfigurerHead } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { EditCompositionsMore } from '$cm+editor/features/EditCompositionsMore';
import { useComs } from '$cm/basis/lib/coms-selections';
import { TheCatSpecialSearches } from '$cm/col/cat/SpecialSearches';
import { CatSpecialSearches } from '$cm/col/cat/useCatSpecialSearches';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { CmWithComListSearchFilterInput } from '$cm/features/CmComListSearchFilterInput';
import { useNavigate } from '@tanstack/react-router';
import { atom, useAtom } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const termAtom = atom('');
const debounceTermAtom = atom('');

export const EditCompositionsPage = () => {
  const coms = useComs();
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [mapper, setMapper] = useState<CatSpecialSearches['map'] | null>(null);
  const [term, setTerm] = useAtom(termAtom);
  const navigate = useNavigate();
  const debouncedTerm = useAtom(debounceTermAtom);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [debouncedTerm]);

  return (
    <>
      <CmWithComListSearchFilterInput
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
                    <TheCatSpecialSearches
                      term={term}
                      setTerm={setTerm}
                      setMapper={setMapper}
                    />
                  )}

                  {catNumberSearch && (
                    <ComFaceList
                      isPutCcomFaceOff={!!term}
                      list={catNumberSearch.comws}
                      comDescription={com => (
                        <div className="text-[.7em] absolute -bottom-[.5em] left-[64px] text-x7/50">
                          {catNumberSearch.descriptions[com.wid]}
                        </div>
                      )}
                    />
                  )}
                  <ComFaceList
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
      </CmWithComListSearchFilterInput>
      {isOpenMorePopup && (
        <BottomPopup onClose={setIsOpenMorePopup}>
          <EditCompositionsMore onClose={setIsOpenMorePopup} />
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
