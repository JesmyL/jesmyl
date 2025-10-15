import { StyledPhaseContainerConfigurerHead } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { EditCompositionsMore } from '$cm+editor/features/EditCompositionsMore';
import { CmCatSpecialSearches } from '$cm/entities/cat/ui/SpecialSearches';
import { useCmComList } from '$cm/entities/com/lib/coms-selections';
import { useNavigate } from '@tanstack/react-router';
import { atom, useAtom } from 'atomaric';
import { ICmCatSpecialSearches } from 'front/apps/cm/06-entities/cat/lib/useCatSpecialSearches';
import { CmComFaceList } from 'front/apps/cm/06-entities/com-face/ui/ComFaceList';
import { CmComWithComListSearchFilterInput } from 'front/apps/cm/06-entities/com/ui/CmComListSearchFilterInput';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const termAtom = atom('');
const debounceTermAtom = atom('');

export const EditCompositionsPage = () => {
  const coms = useCmComList();
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [mapper, setMapper] = useState<ICmCatSpecialSearches['map'] | null>(null);
  const [term, setTerm] = useAtom(termAtom);
  const navigate = useNavigate();
  const debouncedTerm = useAtom(debounceTermAtom);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [debouncedTerm]);

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
                    <CmCatSpecialSearches
                      term={term}
                      setTerm={setTerm}
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
