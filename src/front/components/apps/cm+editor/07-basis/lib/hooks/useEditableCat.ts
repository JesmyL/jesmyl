import { EditableCat } from '$cm+editor/basis/lib/EditableCat';
import { useCmCatICcat } from '$cm/entities/cat/lib/useCcat';
import { useLiveQuery } from 'dexie-react-hooks';
import { cmIDB } from 'front/apps/cm/07-shared/state/cmIDB';
import { useMemo } from 'react';
import { CmCatWid } from 'shared/api';
import { EditableCom } from '../EditableCom';

export const useEditableCcat = (catw: CmCatWid): EditableCat | und => {
  const icat = useCmCatICcat(catw);
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icat && new EditableCat(icat, icoms?.map(icom => new EditableCom(icom)) ?? []), [icat, icoms]);
};

export const useEditableCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return useMemo(() => icats?.map(icat => new EditableCat(icat, [])), [icats]);
};
