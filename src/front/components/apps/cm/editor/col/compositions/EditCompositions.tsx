import { BottomPopup } from 'front/complect/absolute-popup/bottom-popup/BottomPopup';
import { useAtom } from 'front/complect/atoms';
import { useIsNumberSearch } from 'front/complect/DebouncedSearchInput';
import { hookEffectPipe, setTimeoutPipe } from 'front/complect/hookEffectPipe';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useExerListener } from '../../../../../../complect/exer/hooks/useExer';
import { CatSpecialSearches } from '../../../col/cat/Cat.complect';
import { TheCatSpecialSearches } from '../../../col/cat/SpecialSearches';
import { Com } from '../../../col/com/Com';
import { ComFaceList } from '../../../col/com/face/list/ComFaceList';
import { categoryTermAtom, CmComListSearchFilterInput } from '../../../complect/ComListSearchFilterInput';
import { editCompositionNavs } from '../../editorNav';
import PhaseCmEditorContainer from '../../phase-editor-container/PhaseCmEditorContainer';
import { EditableCat } from '../categories/EditableCat';
import { useEditableCcat } from '../categories/useEditableCcat';
import { EditableCom } from './com/EditableCom';
import { EditCompositionsMore } from './complect/EditCompositionsMore';
import EditComposition from './EditComposition';

const mapExtractItem = <Item,>({ item }: { item: Item }): Item => item;

export default function EditCompositions() {
  const zcat: EditableCat | und = useEditableCcat(0);
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const isNumberSearch = useIsNumberSearch();
  useExerListener();
  const listRef = useRef<HTMLDivElement>(null);
  const [searchedComs, setSearchedComs] = useState<Com[]>([]);
  const [mapper, setMapper] = useState<CatSpecialSearches['map'] | null>(null);
  const [term, setTerm] = useAtom(categoryTermAtom);

  useEffect(() => {
    if (zcat == null) return;

    if (mapper) {
      setSearchedComs(mapper(zcat.coms, term));
      return;
    }

    let resetSearch: (() => void) | null = null;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(async () => {
          try {
            const { list, reset } = zcat.sortedSearch(term, isNumberSearch);

            resetSearch = reset;

            const coms = (await list)?.map(mapExtractItem);

            if (coms == null) return;

            setSearchedComs(coms);
          } catch (error) {}
        }),
      )
      .effect(() => resetSearch?.());
  }, [zcat, isNumberSearch, mapper, term]);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <PhaseCmEditorContainer
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
        {editCompositionNavs.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      </Route>
    </Routes>
  );
}
