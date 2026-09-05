import { CmEditorCat } from '$cm+editor/entities/cat';
import { cmIDB } from '$cm/ext';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';

export const useEditableCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return useMemo(() => icats?.map(icat => new CmEditorCat(icat)), [icats]);
};
