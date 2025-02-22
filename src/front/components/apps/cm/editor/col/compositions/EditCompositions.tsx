import { atom, useAtom, useAtomValue } from '#shared/lib/atoms';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { StyledPhaseContainerConfigurerHead } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { Cat } from '@cm/col/cat/Cat';
import { CatSpecialSearches } from '@cm/col/cat/Cat.complect';
import { TheCatSpecialSearches } from '@cm/col/cat/SpecialSearches';
import { Com } from '@cm/col/com/Com';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { useComs } from '@cm/cols/useCols';
import { editCompositionNavs } from '@cm/editor/editorNav';
import { PhaseCmEditorContainer } from '@cm/editor/phase-editor-container/PhaseCmEditorContainer';
import { CmComListSearchFilterInput } from '@cm/shared/ComListSearchFilterInput';
import { categoryTermAtom } from '@cm/shared/ComListSearchFilterInput/lib';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { EditableCom } from './com/EditableCom';
import { EditCompositionsMore } from './complect/EditCompositionsMore';
import { EditComposition } from './EditComposition';

const mapExtractItem = <Item,>({ item }: { item: Item }): Item => item;
const isNumberSearchAtom = atom(false);

export function EditCompositions() {
  const coms = useComs();
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const isNumberSearch = useAtomValue(isNumberSearchAtom);
  const listRef = useRef<HTMLDivElement>(null);
  const [searchedComs, setSearchedComs] = useState<Com[]>([]);
  const [mapper, setMapper] = useState<CatSpecialSearches['map'] | null>(null);
  const [term, setTerm] = useAtom(categoryTermAtom);

  useEffect(() => {
    if (!term) {
      setSearchedComs(coms);
      return;
    }

    if (mapper) {
      (async () => {
        setSearchedComs(await mapper(coms, term));
      })();
      return;
    }

    let resetSearch: (() => void) | null = null;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(async () => {
          try {
            const { list, reset } = Cat.sortedSearch(term, coms, isNumberSearch);

            resetSearch = reset;

            const mappedComs = (await list)?.map(mapExtractItem);

            if (mappedComs == null) return;

            setSearchedComs(mappedComs);
          } catch (_error) {
            //
          }
        }),
      )
      .effect(() => resetSearch?.());
  }, [isNumberSearch, mapper, term, coms]);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <StyledPhaseCmEditorContainer
              className="edit-compositions"
              headClass="flex between full-width"
              head={
                <CmComListSearchFilterInput
                  Constructor={EditableCom}
                  onDebounced={() => {
                    if (listRef.current) listRef.current.scrollTop = 0;
                  }}
                  onSearch={setSearchedComs}
                  isNumberSearchAtom={isNumberSearchAtom}
                />
              }
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
                  <ComFaceList list={searchedComs} />
                </>
              }
            />
            {isOpenMorePopup && (
              <BottomPopup onClose={setIsOpenMorePopup}>
                <EditCompositionsMore onClose={setIsOpenMorePopup} />
              </BottomPopup>
            )}
          </>
        }
      />

      <Route
        path=":comw"
        element={<EditComposition />}
      >
        {editCompositionNavs.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
          />
        ))}
      </Route>
    </Routes>
  );
}

const StyledPhaseCmEditorContainer = styled(PhaseCmEditorContainer)`
  ${StyledPhaseContainerConfigurerHead} {
    width: 100%;
  }
`;
