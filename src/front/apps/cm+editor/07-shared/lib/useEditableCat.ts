import { CmEditorCat } from '$cm+editor/entities/cat';
import { cmIDB, useCmCatICcat } from '$cm/ext';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmCatWid } from 'shared/api';
import { EditableCom } from '../classes/EditableCom';

export const useEditableCcat = (catw: CmCatWid): CmEditorCat | und => {
  const icat = useCmCatICcat(catw);
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icat && new CmEditorCat(icat, icoms?.map(icom => new EditableCom(icom)) ?? []), [icat, icoms]);
};

export const useEditableCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return useMemo(() => icats?.map(icat => new CmEditorCat(icat, [])), [icats]);
};
