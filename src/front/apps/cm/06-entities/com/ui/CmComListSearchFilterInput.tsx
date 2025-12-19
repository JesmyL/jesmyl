import { isNumberSearchAtom } from '#basis/state/isNumberSearchAtom';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { useCmCatList } from '$cm/entities/cat';
import { Atom, useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';
import { CmCom } from '../lib/Com';

const mapExtractItem = <Item,>({ item }: { item: Item }): Item => item;
const sortItemsByRate = (a: { rate: number }, b: { rate: number }) => a.rate - b.rate;

export const CmComWithComListSearchFilterInput = <ComConstructor extends CmCom>(props: {
  comsMapper?: ((coms: CmCom[], term: string) => Promise<CmCom[]>) | null;
  coms?: CmCom[];
  Constructor: new (icom: IExportableCom) => ComConstructor;
  termAtom: Atom<string>;
  children: (props: {
    inputNode: React.ReactNode;
    searchedComs: ComConstructor[];
    limitedComs: ComConstructor[];
    foundComsLength: number;
    catNumberSearch: {
      comws: CmComWid[];
      descriptions: PRecord<CmComWid, string>;
    } | null;
  }) => React.ReactNode;
}) => {
  type CatNumberSearch = Parameters<typeof props.children>[0]['catNumberSearch'];

  const term = useAtomValue(props.termAtom);
  const isNumberSearch = useAtomValue(isNumberSearchAtom);
  const cats = useCmCatList();

  const catNumberSearch = useMemo((): CatNumberSearch => {
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
    async () => (term && props.coms && props.comsMapper ? props.comsMapper(props.coms, term) : null),
    [props.coms, term, props.comsMapper],
  ) as ComConstructor[] | nil;

  const searchedComs = useMemo(() => {
    const comList = props.coms?.map(com => new props.Constructor(com.top)) ?? [];
    if (term === '404' || !term) return comList;

    const numCheckedTerm = isNumberSearch || isNaN(+term) ? term : +term > 403 ? `${+term - 1}` : term;

    return mylib
      .searchRate(
        comList,
        numCheckedTerm,
        ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']],
        isNumberSearch,
        num => (num > 403 ? num + 1 : num),
      )
      .sort(sortItemsByRate)
      .map(mapExtractItem);
  }, [props.Constructor, props.coms, isNumberSearch, term]);

  const limitedComs = useMemo(() => {
    if (!term.length) return searchedComs;

    return searchedComs?.slice(0, 30);
  }, [searchedComs, term.length]);

  return props.children({
    inputNode: (
      <DebouncedSearchInput
        placeholder="Песни"
        className="com-search debounced-searcher round-styled"
        debounce={500}
        termAtom={props.termAtom}
      />
    ),
    catNumberSearch,
    limitedComs,
    searchedComs: mappedComs ?? searchedComs,
    foundComsLength: (catNumberSearch?.comws.length ?? 0) + (mappedComs ?? searchedComs).length,
  });
};
