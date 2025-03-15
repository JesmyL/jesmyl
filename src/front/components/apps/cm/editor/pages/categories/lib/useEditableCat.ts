import { cmIDB } from '$cm/_db/cm-idb';
import { useIccat } from '$cm/col/cat/useCcat';
import { EditableCat } from '$cm/editor/lib/EditableCat';
import { EditableCom } from '$cm/editor/lib/EditableCom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid } from 'shared/api';

export const useEditableCcat = (catw: CmCatWid): EditableCat | und => {
  const icat = useIccat(catw);
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icat && new EditableCat(icat, icoms?.map(icom => new EditableCom(icom)) ?? []), [icat, icoms]);
};

export const useEditableCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return useMemo(() => icats?.map(icat => new EditableCat(icat, [])), [icats]);
};
