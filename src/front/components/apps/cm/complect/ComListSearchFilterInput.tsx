import { useLiveQuery } from 'dexie-react-hooks';
import { atom, useAtom } from 'front/complect/atoms';
import DebouncedSearchInput from 'front/complect/DebouncedSearchInput';
import { mylib } from 'front/utils';
import { useEffect } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';
import { cmIDB } from '../_db/cm-db';
import { Com } from '../col/com/Com';

export const categoryTermAtom = atom('');

export const CmComListSearchFilterInput = <ComConstructor extends Com>({
  Constructor,
  onDebounced,
  onSearch,
  showComwList,
}: {
  onDebounced?: () => void;
  onSearch: (coms: ComConstructor[]) => void;
  showComwList?: CmComWid[];
  Constructor: new (icom: IExportableCom) => ComConstructor;
}) => {
  const [term, setTerm] = useAtom(categoryTermAtom);

  const fullIcomList = useLiveQuery(() =>
    showComwList == null ? cmIDB.db.coms.toArray() : cmIDB.db.coms.where('w').anyOf(showComwList).toArray(),
  );
  useEffect(() => {
    const coms = fullIcomList?.map(icom => new Constructor(icom)) ?? [];
    if (!term) {
      onSearch(coms);
      return;
    }

    onSearch(
      mylib
        .searchRate(coms, term, ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']])
        .sort((a, b) => b.rate - a.rate)
        .map(({ item }) => item),
    );
  }, [Constructor, fullIcomList, onSearch, term]);

  return (
    <DebouncedSearchInput
      placeholder="Песни"
      className="debounced-searcher round-styled"
      debounce={500}
      initialTerm={term}
      onSearch={setTerm}
      onDebounced={onDebounced}
    />
  );
};
