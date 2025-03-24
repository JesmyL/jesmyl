import { isNumberSearchAtom } from '#basis/lib/atoms/isNumberSearchAtom';
import { useAtom, useAtomValue } from '#shared/lib/atom';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { StyledPhaseContainerConfigurerHead } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { EditCompositionsMore } from '$cm+editor/features/EditCompositionsMore';
import { useComs } from '$cm/basis/lib/coms-selections';
import { Cat } from '$cm/col/cat/Cat';
import { CatSpecialSearches } from '$cm/col/cat/Cat.complect';
import { TheCatSpecialSearches } from '$cm/col/cat/SpecialSearches';
import { Com } from '$cm/col/com/Com';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { CmComListSearchFilterInput } from '$cm/shared/ComListSearchFilterInput';
import { categoryDebounceTermAtom, categoryTermAtom } from '$cm/shared/ComListSearchFilterInput/lib';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const mapExtractItem = <Item,>({ item }: { item: Item }): Item => item;

export const EditCompositionsPage = () => {
  const coms = useComs();
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const isNumberSearch = useAtomValue(isNumberSearchAtom);
  const listRef = useRef<HTMLDivElement>(null);
  const [searchedComs, setSearchedComs] = useState<Com[]>([]);
  const [mapper, setMapper] = useState<CatSpecialSearches['map'] | null>(null);
  const [term, setTerm] = useAtom(categoryTermAtom);
  const navigate = useNavigate();
  const debouncedTerm = useAtom(categoryDebounceTermAtom);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [debouncedTerm]);

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
    <>
      <StyledPageCmEditorContainer
        className="edit-compositions"
        headClass="flex between full-width"
        head={
          <CmComListSearchFilterInput
            Constructor={EditableCom}
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
            <ComFaceList
              list={searchedComs}
              importantOnClick={({ com }) => {
                navigate({
                  to: '/cm/edit/coms/$comw',
                  params: { comw: `${com.wid}` },
                  search: { tab: 'watch' },
                });
              }}
            />
          </>
        }
      />
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
