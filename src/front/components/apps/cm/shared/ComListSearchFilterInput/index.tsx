import { Atom, useAtom } from '#shared/lib/atoms';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { Com } from '$cm/col/com/Com';
import { useEffect } from 'react';
import { IExportableCom } from 'shared/api';
import { categoryTermAtom } from './lib';

export const CmComListSearchFilterInput = <ComConstructor extends Com>({
  Constructor,
  onDebounced,
  onSearch,
  coms,
  isNumberSearchAtom,
}: {
  onDebounced?: () => void;
  onSearch: (coms: ComConstructor[]) => void;
  coms?: Com[];
  Constructor: new (icom: IExportableCom) => ComConstructor;
  isNumberSearchAtom?: Atom<boolean, (value: boolean) => void>;
}) => {
  const [term, setTerm] = useAtom(categoryTermAtom);

  useEffect(() => {
    if (term === '404') {
      onSearch([]);
      return;
    }
    const comList = coms?.map(com => new Constructor(com.top)) ?? [];
    if (!term) {
      onSearch(comList);
      return;
    }

    const numCheckedTerm = isNaN(+term) ? term : +term > 403 ? `${+term - 1}` : term;

    onSearch(
      mylib
        .searchRate(comList, numCheckedTerm, ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']])
        .sort((a, b) => b.rate - a.rate)
        .map(({ item }) => item),
    );
  }, [Constructor, coms, onSearch, term]);

  return (
    <DebouncedSearchInput
      placeholder="Песни"
      className="com-search debounced-searcher round-styled"
      debounce={500}
      initialTerm={term}
      onSearch={setTerm}
      onDebounced={onDebounced}
      isNumberSearchAtom={isNumberSearchAtom}
    />
  );
};
