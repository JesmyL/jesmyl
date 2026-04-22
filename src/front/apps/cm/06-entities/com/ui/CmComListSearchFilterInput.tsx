import { isNumberSearchAtom } from '#basis/state/isNumberSearchAtom';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { useCmCatList } from '$cm/entities/cat';
import { CmCom } from '$cm/ext';
import { Atom, useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComOrderWid, CmComWid, IExportableCom } from 'shared/api';
import { itNNil } from 'shared/utils';
import { takeCorrectComIndex, takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { CmComWordFounds } from '../model/com';
import { cmComWidNumberDictAtom } from '../state/atoms';

const mapExtractItem = <Item,>({ item }: { item: Item }): Item => item;
const sortItemsByRate = (a: { rate: number }, b: { rate: number }) => a.rate - b.rate;

export const CmComWithComListSearchFilterInput = <ComConstructor extends CmCom>(props: {
  comsMapper?: ((coms: CmCom[], term: string) => Promise<CmCom[]>) | null;
  coms?: CmCom[];
  Constructor: new (icom: IExportableCom) => ComConstructor;
  termAtom: Atom<string>;
  children: (props: {
    term: string;
    inputNode: React.ReactNode;
    searchedComs: ComConstructor[];
    limitedComs: ComConstructor[];
    foundComsLength: number;
    wordFounds: CmComWordFounds;
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
    const result: { coms: ComConstructor[]; founds: CmComWordFounds } = {
      coms: [],
      founds: {},
    };

    if (term === '404') return result;

    const comList = props.coms?.map(com => new props.Constructor(com.top)) ?? [];
    if (!term) {
      result.coms = comList;
      return result;
    }

    const numCheckedTerm = isNumberSearch || isNaN(+term) ? term : `${takeCorrectComIndex(+term)}`;

    if (!isNumberSearch) {
      const multiNums = term.split(makeRegExp('/[ ,]+/'));
      const isMultiNumSearch = !multiNums.some(numStr => mylib.isNaN(+numStr));

      if (isMultiNumSearch) {
        const searchNumberIndexDict: Record<number, number> = {};
        for (const numi in multiNums) searchNumberIndexDict[+multiNums[numi]] = +numi;

        result.coms = comList
          .filter(com => comwNumberDict[com.wid]! in searchNumberIndexDict)
          .sort(
            (a, b) => searchNumberIndexDict[comwNumberDict[a.wid]!] - searchNumberIndexDict[comwNumberDict[b.wid]!],
          );

        return result;
      }
    }

    const searchs = mylib.searchRate(
      comList,
      numCheckedTerm,
      ['name', mylib.c.POSITION, ['orders', mylib.c.INDEX, 'text']],
      isNumberSearch,
      takeCorrectComNumber,
    );

    result.coms = searchs.sort(sortItemsByRate).map(mapExtractItem);

    result.founds = searchs.reduce((acc, item) => {
      const orderwWordiDict: PRecord<CmComOrderWid, Record<number, { linei: number; wordi: number }>> = {};
      acc[item.item.wid] = item.pos
        .map(positions => {
          const [, ordIndexStr, letterIndexStr] =
            positions.match(makeRegExp(`/${mylib.c.INDEX}:(\\d+)/text/(\\d+)/`)) ?? [];

          if (!letterIndexStr) return;
          const ord = item.item.orders?.[+ordIndexStr];

          if (!ord) return;
          const ordw = ord.wid;

          if (!orderwWordiDict[ordw]) {
            orderwWordiDict[ordw] = {};
            const all = Array.from(ord.text.matchAll(/[^ \n]+(?: |\n|$)/g));
            let linei = 0;
            let lineWordi = 0;

            all.reduce((acc, foundWord) => {
              acc[foundWord.index] = { linei, wordi: lineWordi++ };
              if (foundWord[0]?.endsWith('\n')) {
                linei++;
                lineWordi = 0;
              }

              return acc;
            }, orderwWordiDict[ordw]);
          }
          return { ordw, ...orderwWordiDict[ordw][+letterIndexStr] };
        })
        .filter(itNNil);

      return acc;
    }, result.founds);

    return result;
  }, [comwNumberDict, isNumberSearch, props.Constructor, props.coms, term]);

  const limitedComs = useMemo(() => {
    if (!term.length) return searchedComs.coms;

    return searchedComs.coms?.slice(0, 30);
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
    term,
    catNumberSearch,
    limitedComs: limitedComs,
    searchedComs: mappedComs ?? searchedComs.coms,
    foundComsLength: (catNumberSearch?.comws.length ?? 0) + (mappedComs ?? searchedComs.coms).length,
    wordFounds: searchedComs.founds,
  });
};
