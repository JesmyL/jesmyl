import { isNumberSearchAtom } from '#basis/lib/atoms/isNumberSearchAtom';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { useCats } from '$cm/basis/lib/hooks/useCats';
import { Com } from '$cm/col/com/Com';
import { Atom, useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';

const mapExtractItem = <Item,>({ item }: { item: Item }): Item => item;
const sortItemsByRate = (a: { rate: number }, b: { rate: number }) => a.rate - b.rate;

export const CmWithComListSearchFilterInput = <ComConstructor extends Com>({
  Constructor,
  coms,
  termAtom,
  children,
  comsMapper,
}: {
  comsMapper?: ((coms: Com[], term: string) => Promise<Com[]>) | null;
  coms?: Com[];
  Constructor: new (icom: IExportableCom) => ComConstructor;
  termAtom: Atom<string>;
  children: (props: {
    inputNode: React.ReactNode;
    searchedComs: ComConstructor[];
    limitedComs: ComConstructor[];
    catNumberSearch: {
      comws: CmComWid[];
      descriptions: PRecord<CmComWid, string>;
    } | null;
  }) => React.ReactNode;
}) => {
  const term = useAtomValue(termAtom);
  const isNumberSearch = useAtomValue(isNumberSearchAtom);
  const cats = useCats();

  const catNumberSearch = useMemo((): Parameters<typeof children>[0]['catNumberSearch'] => {
    const descriptions: PRecord<CmComWid, string> = {};
    const comws: CmComWid[] = [];
    const result = { descriptions, comws };
    const termNumber = +term;

    if (mylib.isNaN(termNumber)) return null;

    cats.forEach(cat => {
      const catDict = cat.dict;
      if (catDict == null) return;

      cat.comws.forEach(comw => {
        if (catDict[comw] !== termNumber) return;
        comws.push(comw);
        descriptions[comw] = `${termNumber} ${cat.name}`;
      });
    });

    return result;
  }, [cats, term]);

  const mappedComs = useLiveQuery(
    async () => (term && coms && comsMapper ? comsMapper(coms, term) : null),
    [coms, term, comsMapper],
  ) as ComConstructor[] | nil;

  const searchedComs = useMemo(() => {
    const comList = coms?.map(com => new Constructor(com.top)) ?? [];
    if (term === '404' || !term) return comList;

    const numCheckedTerm = isNumberSearch || isNaN(+term) ? term : +term > 403 ? `${+term - 1}` : term;

    return mylib
      .searchRate(
        comList,
        numCheckedTerm,
        ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']],
        isNumberSearch,
      )
      .sort(sortItemsByRate)
      .map(mapExtractItem);
  }, [Constructor, coms, isNumberSearch, term]);

  const limitedComs = useMemo(() => {
    if (!term.length) return searchedComs;

    return searchedComs?.slice(0, 30);
  }, [searchedComs, term.length]);

  return children({
    inputNode: (
      <DebouncedSearchInput
        placeholder="Песни"
        className="com-search debounced-searcher round-styled"
        debounce={500}
        termAtom={termAtom}
      />
    ),
    searchedComs: mappedComs ?? searchedComs,
    catNumberSearch,
    limitedComs,
  });
};
