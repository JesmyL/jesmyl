import { useLiveQuery } from 'dexie-react-hooks';
import { cmIDB } from '../../_db/cm-db';
import { EditableCat } from './categories/EditableCat';
import { EditableCom } from './compositions/com/EditableCom';

export const useEditableComs = () => {
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return icoms?.map(icom => new EditableCom(icom));
};

export const useEditableCats = () => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());

  return icats?.map(icat => new EditableCat(icat, []));
};
