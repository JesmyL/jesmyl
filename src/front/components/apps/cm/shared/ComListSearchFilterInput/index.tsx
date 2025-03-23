import { isNumberSearchAtom } from '#basis/lib/atoms/isNumberSearchAtom';
import { useAtomValue } from '#shared/lib/atoms';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { Com } from '$cm/col/com/Com';
import { useEffect } from 'react';
import { IExportableCom } from 'shared/api';
import { categoryDebounceTermAtom, categoryTermAtom } from './lib';

export const CmComListSearchFilterInput = <ComConstructor extends Com>({
  Constructor,
  onSearch,
  coms,
}: {
  onSearch: (coms: ComConstructor[]) => void;
  coms?: Com[];
  Constructor: new (icom: IExportableCom) => ComConstructor;
}) => {
  const term = useAtomValue(categoryDebounceTermAtom);
  const isNumberSearch = useAtomValue(isNumberSearchAtom);

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

    const numCheckedTerm = isNumberSearch || isNaN(+term) ? term : +term > 403 ? `${+term - 1}` : term;

    onSearch(
      mylib
        .searchRate(
          comList,
          numCheckedTerm,
          ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']],
          isNumberSearch,
        )
        .sort((a, b) => a.rate - b.rate)
        .map(({ item }) => item),
    );
  }, [Constructor, coms, isNumberSearch, onSearch, term]);

  return (
    <DebouncedSearchInput
      placeholder="Песни"
      className="com-search debounced-searcher round-styled"
      debounce={500}
      debouncedTermAtom={categoryDebounceTermAtom}
      termAtom={categoryTermAtom}
    />
  );
};
