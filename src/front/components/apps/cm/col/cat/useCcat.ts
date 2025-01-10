import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { cmIDB } from '../../_db/cm-db';
import { useComs } from '../../cols/useCols';
import { Cat } from './Cat';

export function useCcat(isTakeZeroCat?: boolean): Cat | nil {
  const icat = useIccat(isTakeZeroCat ? 0 : undefined);
  const coms = useComs();

  return useMemo(() => icat && coms && new Cat(icat, coms), [coms, icat]);
}

export function useIccat(catw?: number) {
  const ccatw = +useParams().catw!;
  return useLiveQuery(() => cmIDB.db.cats.where({ w: catw ?? ccatw }).first());
}
