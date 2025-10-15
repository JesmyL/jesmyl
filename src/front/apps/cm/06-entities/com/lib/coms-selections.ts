import { contextCreator } from '#shared/lib/contextCreator';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { CmCom } from './Com';

export const useCmComList = (comwsLine?: CmComWid[]) => {
  const icoms = useLiveQuery(
    () => (comwsLine == null ? cmIDB.db.coms.toArray() : cmIDB.db.coms.where('w').anyOf(comwsLine).toArray()),
    [comwsLine],
  );

  return useMemo(() => {
    if (icoms == null) return [];

    if (comwsLine) {
      const indexes = {} as Record<CmComWid, number>;
      comwsLine.forEach((comw, comwi) => (indexes[comw] = comwi));
      icoms?.sort();
      icoms.sort((a, b) => indexes[a.w] - indexes[b.w]);
    }

    const coms = icoms.map(icom => new CmCom(icom));

    return coms;
  }, [comwsLine, icoms]);
};

export const [CmComListContext, useCmComListContext] = contextCreator<CmCom[]>([]);
