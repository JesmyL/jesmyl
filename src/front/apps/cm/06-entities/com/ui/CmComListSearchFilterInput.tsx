import { translateBase } from '#basis/locale';
import { isNumberSearchAtom } from '#basis/state/isNumberSearchAtom';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { useCmCatList } from '$cm/entities/cat';
import { cmIDB } from '$cm/ext';
import { Atom, useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComOrderWid, CmComWid } from 'shared/api';
import { itNNil } from 'shared/utils';
import { checkIsNaN } from 'shared/utils/checkIs';
import { takeCorrectComIndex, takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { searchConstants, searchRate } from 'shared/utils/searchRate';
import { CmComWordFounds } from '../model/com';
import { cmComWidNumberDictAtom } from '../state/atoms';

const sortItemsByRate = (a: { rate: number }, b: { rate: number }) => a.rate - b.rate;

export const CmComWithComListSearchFilterInput = (props: {
  comws: CmComWid[];
  termAtom: Atom<string>;
  children: (props: {
    term: string;
    inputNode: React.ReactNode;
    searchedComs: CmComWid[];
    limitedComs: CmComWid[];
    foundComsLength: number;
    wordFounds: CmComWordFounds;
    catNumberSearch: {
      comws: CmComWid[];
      descriptions: PRecord<CmComWid, string>;
    } | null;
  }) => React.ReactNode;
}) => {
  type CatNumberSearch = Parameters<typeof props.children>[0]['catNumberSearch'];

  const term = useAtomValue(props.termAtom).trim();
  const isNumberSearch = useAtomValue(isNumberSearchAtom);
  const cats = useCmCatList();
  const comwNumberDict = useAtomValue(cmComWidNumberDictAtom);

  const catNumberSearch = useMemo((): CatNumberSearch => {
    const termNumber = +term;

    if (checkIsNaN(termNumber)) return null;

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

  const icoms = useLiveQuery(
    async () => (term ? cmIDB.tb.coms.where('w').anyOf(props.comws).toArray() : []),
    [props.comws, term],
  );

  const searchedComs = useMemo(() => {
    const result: { comws: CmComWid[]; founds: CmComWordFounds } = {
      comws: [],
      founds: {},
    };

    if (term === '404') return result;

    if (!term) {
      result.comws = props.comws ?? [];
      return result;
    }

    const numCheckedTerm = isNumberSearch || isNaN(+term) ? term : `${takeCorrectComIndex(+term)}`;

    if (!isNumberSearch) {
      const multiNums = term.split(makeRegExp('/[ ,]+/'));
      const isMultiNumSearch = !multiNums.some(numStr => checkIsNaN(+numStr));

      if (isMultiNumSearch) {
        const searchNumberIndexDict: Record<number, number> = {};
        for (const numi in multiNums) searchNumberIndexDict[+multiNums[numi]] = +numi;

        result.comws =
          props.comws
            ?.filter(comw => (comwNumberDict[comw]?.i as never) in searchNumberIndexDict)
            .sort(
              (aw, bw) =>
                searchNumberIndexDict[comwNumberDict[aw]?.i as never] -
                searchNumberIndexDict[comwNumberDict[bw]?.i as never],
            ) ?? [];

        return result;
      }
    }

    const searchs = searchRate(
      icoms ?? [],
      numCheckedTerm,
      ['n', searchConstants.POSITION, ['t', searchConstants.INDEX]],
      isNumberSearch,
      takeCorrectComNumber,
    );

    result.comws = searchs.sort(sortItemsByRate).map(com => com.item.w);

    result.founds = searchs.reduce((acc, { item: com, pos }) => {
      const orderwWordiDict: PRecord<CmComOrderWid, Record<number, { linei: number; wordi: number }>> = {};
      acc[com.w] = pos
        .map(positions => {
          const [, ordIndexStr, letterIndexStr] =
            positions.match(makeRegExp(`/${searchConstants.INDEX[0]}:(\\d+)/text/(\\d+)/`)) ?? [];

          if (!letterIndexStr) return;
          const ord = com.o?.[+ordIndexStr];

          if (!ord) return;
          const ordw = ord.w;

          if (!orderwWordiDict[ordw]) {
            orderwWordiDict[ordw] = {};
            const all = Array.from(com.t[ord.t ?? 0].matchAll(/[^ \n]+(?: |\n|$)/g));
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
  }, [comwNumberDict, icoms, isNumberSearch, props.comws, term]);

  const limitedComs = useMemo(() => {
    if (!term.length) return searchedComs.comws;

    return searchedComs.comws?.slice(0, 30);
  }, [searchedComs, term.length]);

  return props.children({
    inputNode: (
      <DebouncedSearchInput
        placeholder={translateBase(it => it.cm.coms)}
        className="com-search debounced-searcher round-styled"
        debounce={500}
        termAtom={props.termAtom}
      />
    ),
    term,
    catNumberSearch,
    limitedComs: limitedComs,
    searchedComs: searchedComs.comws,
    foundComsLength: (catNumberSearch?.comws.length ?? 0) + searchedComs.comws.length,
    wordFounds: searchedComs.founds,
  });
};
