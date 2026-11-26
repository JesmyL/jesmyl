import { translateBase } from '#basis/locale';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { Badge } from '#shared/components/ui/badge';
import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { CmEditorEERulesWord } from '$cm+editor/features/e-e-rules';
import { useMemo } from 'react';
import { EeStorePack } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { useEeWordsSlice } from '$cm+editor/shared/lib/useEeWordsSlice';

type Props = {
  list: string[];
  total: number;
  pageSize: number;
  currentPage: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  editedWordsRef: { current: EeStorePack };
  setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
  ignoredWordsSetRef: { current: Set<string> };
  sharedWords: EeStorePack;
};

export const CmEditorEERulesPageList = ({
  list,
  total,
  pageSize,
  currentPage,
  setPage,
  setPageSize,
  editedWordsRef,
  setEditedWords,
  ignoredWordsSetRef,
  sharedWords,
}: Props) => {
  const visibleWords = useMemo(
    () => list.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [list, currentPage, pageSize],
  );
  const slice = useEeWordsSlice(visibleWords);
  const eeStoreRef = useActualRef(useMemo(() => ({ ...slice, ...sharedWords }), [slice, sharedWords]));

  return (
    <>
      <ButtonGroup.Root className="my-3">
        {[10, 30, 50, 100].map(size => (
          <Button
            key={size}
            disabled={pageSize === size}
            onClick={() => setPageSize(size)}
          >
            {size}
          </Button>
        ))}
      </ButtonGroup.Root>
      <Badge className="mr-2 mb-2">
        {translateBase(BaseLocaleKey.Word)}: {total} / {list.length} ({((total / list.length) * 100).toFixed(3)}%)
      </Badge>
      <Dropdown
        onSelect={({ id }) => setPage(id)}
        items={Array(Math.ceil(list.length / pageSize))
          .fill(0)
          .map((_, page): DropdownItem<number> => {
            const words = list.slice(page * pageSize, page * pageSize + pageSize);

            return {
              title: words[0],
              id: page,
              disabled: currentPage === page,
            };
          })}
      />
      {visibleWords.map(word => (
        <CmEditorEERulesWord
          key={word}
          word={word}
          setEditedWords={setEditedWords}
          ignoredWordsSetRef={ignoredWordsSetRef}
          eeStoreRef={eeStoreRef}
          editedWordsRef={editedWordsRef}
        />
      ))}
    </>
  );
};
