import { EditableCat } from '$cm+editor/basis/lib/EditableCat';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useIccat } from '$cm/col/cat/useCcat';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid } from 'shared/api';
import { EditableCom } from '../EditableCom';

export const useEditableCcat = (catw: CmCatWid): EditableCat | und => {
  const icat = useIccat(catw);
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icat && new EditableCat(icat, icoms?.map(icom => new EditableCom(icom)) ?? []), [icat, icoms]);
};

export const useEditableCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return useMemo(() => icats?.map(icat => new EditableCat(icat, [])), [icats]);
};
