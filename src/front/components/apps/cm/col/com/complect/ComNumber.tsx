import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid } from 'shared/api';
import { cmIDB } from '../../../_db/cm-db';

export const CmComNumber = ({ comw }: { comw: CmComWid }) => (
  <>{useLiveQuery(() => cmIDB.db.coms.where('w').belowOrEqual(comw).count())}</>
);
