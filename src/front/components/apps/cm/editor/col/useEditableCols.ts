import { cmIDB } from '@cm/shared/lib/cmIdb';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { EditableCat } from './categories/EditableCat';
import { EditableCom } from './compositions/com/EditableCom';

export const useEditableComs = () => {
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icoms?.map(icom => new EditableCom(icom)), [icoms]);
};

export const useEditableCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return useMemo(() => icats?.map(icat => new EditableCat(icat, [])), [icats]);
};
