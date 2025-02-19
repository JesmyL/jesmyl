import { atom, useAtom } from '#shared/lib/atom';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';
import { cmIDB } from '../_db/cm-idb';
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

  const fullIcomList = useLiveQuery(
    () => (showComwList == null ? cmIDB.db.coms.toArray() : cmIDB.db.coms.where('w').anyOf(showComwList).toArray()),
    [showComwList],
  );
  useEffect(() => {
    if (term === '404') {
      onSearch([]);
      return;
    }
    const coms = fullIcomList?.map(icom => new Constructor(icom)) ?? [];
    if (!term) {
      onSearch(coms);
      return;
    }

    const numCheckedTerm = isNaN(+term) ? term : +term > 403 ? `${+term - 1}` : term;

    onSearch(
      mylib
        .searchRate(coms, numCheckedTerm, ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']])
        .sort((a, b) => b.rate - a.rate)
        .map(({ item }) => item),
    );
  }, [Constructor, fullIcomList, onSearch, term]);

  return (
    <DebouncedSearchInput
      placeholder="Песни"
      className="com-search debounced-searcher round-styled"
      debounce={500}
      initialTerm={term}
      onSearch={setTerm}
      onDebounced={onDebounced}
    />
  );
};
