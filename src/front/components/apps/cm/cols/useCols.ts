import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { cmIDB } from '../_db/cm-idb';
import { Cat } from '../col/cat/Cat';
import { Com } from '../col/com/Com';

export const useComs = (comwsLine?: CmComWid[]) => {
  const icoms = useLiveQuery(
    () => (comwsLine == null ? cmIDB.db.coms.toArray() : cmIDB.db.coms.where('w').anyOf(comwsLine).toArray()),
    [comwsLine],
  );

  return useMemo(() => icoms?.map(icom => new Com(icom)) ?? [], [icoms]);
};

export const useCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return icats?.map(icat => new Cat(icat, [])) ?? [];
};
