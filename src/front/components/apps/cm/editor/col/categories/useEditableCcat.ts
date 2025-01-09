import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { cmIDB } from '../../../_db/cm-db';
import { EditableCom } from '../compositions/com/EditableCom';
import { EditableCat } from './EditableCat';

export function useEditableCcat(catw?: number): EditableCat | und {
  const ccatw = +useParams().catw!;
  const icat = useLiveQuery(() => cmIDB.db.cats.where({ w: catw ?? ccatw }).first());
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(
    () => icat && new EditableCat(icat, icoms?.map((icom, icomi) => new EditableCom(icom, icomi)) ?? []),
    [icat, icoms],
  );
}
