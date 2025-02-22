import { cmIDB } from '@cm/_db/cm-idb';
import { useIccat } from '@cm/col/cat/useCcat';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { EditableCom } from '../compositions/com/EditableCom';
import { EditableCat } from './EditableCat';

export function useEditableCcat(catw?: number): EditableCat | und {
  const icat = useIccat(catw);
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icat && new EditableCat(icat, icoms?.map(icom => new EditableCom(icom)) ?? []), [icat, icoms]);
}
