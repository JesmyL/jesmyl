import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid } from 'shared/api';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { cmIDB } from '../state/cmIDB';

export const useComNumber = (comw: CmComWid | CmComWid[]) => {
  return useLiveQuery(async () => takeCorrectComNumber(await cmIDB.db.coms.where('w').belowOrEqual(comw).count()));
};
