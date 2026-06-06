import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmCat } from 'shared/const/cm/Cat';

export const useCmCatList = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return icats?.map(icat => new CmCat(icat, [])) ?? [];
};
