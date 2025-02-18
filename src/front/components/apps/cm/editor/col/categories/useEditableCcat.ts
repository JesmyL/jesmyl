import { cmIDB } from '#basis/lib/idb/cm';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { useIccat } from '../../../col/cat/useCcat';
import { EditableCom } from '../compositions/com/EditableCom';
import { EditableCat } from './EditableCat';

export function useEditableCcat(catw?: number): EditableCat | und {
  const icat = useIccat(catw);
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(
    () => icat && new EditableCat(icat, icoms?.map((icom, icomi) => new EditableCom(icom)) ?? []),
    [icat, icoms],
  );
}
