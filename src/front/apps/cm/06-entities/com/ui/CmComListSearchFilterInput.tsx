import { isNumberSearchAtom } from '#basis/state/isNumberSearchAtom';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { useCmCatList } from '$cm/entities/cat';
import { CmCom } from '$cm/ext';
import { Atom, useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComWid, IExportableCom } from 'shared/api';
import { takeCorrectComIndex, takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { cmComWidNumberDictAtom } from '../state/atoms';

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
  const comwNumberDict = useAtomValue(cmComWidNumberDictAtom);

  const catNumberSearch = useMemo((): CatNumberSearch => {
    const termNumber = +term;

    if (mylib.isNaN(termNumber)) return null;

    const descriptions: PRecord<CmComWid, string> = {};
    const comws: CmComWid[] = [];
    const result = { descriptions, comws };

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
    if (term === '404') return [];

    const comList = props.coms?.map(com => new props.Constructor(com.top)) ?? [];
    if (!term) return comList;

    const numCheckedTerm = isNumberSearch || isNaN(+term) ? term : `${takeCorrectComIndex(+term)}`;
    const multiNums = term.split(makeRegExp('/[ ,]+/'));
    const isMultiNumSearch = !multiNums.some(numStr => mylib.isNaN(+numStr));

    if (isMultiNumSearch) {
      const searchNumberIndexDict: Record<number, number> = {};
      for (const numi in multiNums) searchNumberIndexDict[+multiNums[numi]] = +numi;

      return comList
        .filter(com => comwNumberDict[com.wid]! in searchNumberIndexDict)
        .sort((a, b) => searchNumberIndexDict[comwNumberDict[a.wid]!] - searchNumberIndexDict[comwNumberDict[b.wid]!]);
    }

    return mylib
      .searchRate(
        comList,
        numCheckedTerm,
        ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']],
        isNumberSearch,
        takeCorrectComNumber,
      )
      .sort(sortItemsByRate)
      .map(mapExtractItem);
  }, [comwNumberDict, isNumberSearch, props.Constructor, props.coms, term]);

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
