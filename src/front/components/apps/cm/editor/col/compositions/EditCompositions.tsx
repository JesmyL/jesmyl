import { BottomPopup } from 'front/complect/absolute-popup/bottom-popup/BottomPopup';
import { useAtom } from 'front/complect/atoms';
import { useIsNumberSearch } from 'front/complect/DebouncedSearchInput';
import { hookEffectPipe, setTimeoutPipe } from 'front/complect/hookEffectPipe';
import { StyledPhaseContainerConfigurerHead } from 'front/complect/phase-container/PhaseContainerConfigurer';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Cat } from '../../../col/cat/Cat';
import { CatSpecialSearches } from '../../../col/cat/Cat.complect';
import { TheCatSpecialSearches } from '../../../col/cat/SpecialSearches';
import { Com } from '../../../col/com/Com';
import { ComFaceList } from '../../../col/com/face/list/ComFaceList';
import { useComs } from '../../../cols/useCols';
import { categoryTermAtom, CmComListSearchFilterInput } from '../../../complect/ComListSearchFilterInput';
import { editCompositionNavs } from '../../editorNav';
import PhaseCmEditorContainer from '../../phase-editor-container/PhaseCmEditorContainer';
import { EditableCom } from './com/EditableCom';
import { EditCompositionsMore } from './complect/EditCompositionsMore';
import EditComposition from './EditComposition';

const mapExtractItem = <Item,>({ item }: { item: Item }): Item => item;

export default function EditCompositions() {
  const coms = useComs();
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const isNumberSearch = useIsNumberSearch();
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
          } catch (error) {}
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
