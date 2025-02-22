import { cmIDB } from '@cm/_db/cm-idb';
import { Cat } from '@cm/col/cat/Cat';
import { Com } from '@cm/col/com/Com';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid, CmComWidStr } from 'shared/api';

export const useComs = (comwsLine?: CmComWid[]) => {
  const icoms = useLiveQuery(
    () => (comwsLine == null ? cmIDB.db.coms.toArray() : cmIDB.db.coms.where('w').anyOf(comwsLine).toArray()),
    [comwsLine],
  );

  return useMemo(() => {
    if (icoms == null) return [];

    if (comwsLine) {
      const indexes = {} as Record<CmComWidStr, number>;
      comwsLine.forEach((comw, comwi) => (indexes[comw] = comwi));
      icoms?.sort();
      icoms.sort((a, b) => indexes[a.w] - indexes[b.w]);
    }

    const coms = icoms.map(icom => new Com(icom));

    return coms;
  }, [comwsLine, icoms]);
};

export const useCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return icats?.map(icat => new Cat(icat, [])) ?? [];
};
