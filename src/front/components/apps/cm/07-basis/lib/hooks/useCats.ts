import { cmIDB } from '$cm/basis/lib/cmIDB';
import { Cat } from '$cm/col/cat/Cat';
import { useLiveQuery } from 'dexie-react-hooks';

export const useCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return icats?.map(icat => new Cat(icat, [])) ?? [];
};
