import { cmIDB } from '$cm/_db/cm-idb';
import { Cat } from '$cm/col/cat/Cat';
import { useLiveQuery } from 'dexie-react-hooks';

export const useCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return icats?.map(icat => new Cat(icat, [])) ?? [];
};
