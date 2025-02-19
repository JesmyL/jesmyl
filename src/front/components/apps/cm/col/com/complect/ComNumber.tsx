import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid } from 'shared/api';
import { cmIDB } from '../../../_db/cm-idb';

export const CmComNumber = ({ comw }: { comw: CmComWid }) => {
  const number = useLiveQuery(() => cmIDB.db.coms.where('w').belowOrEqual(comw).count(), [comw]);
  return <>{number && number > 403 ? number + 1 : number}</>;
};
