import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { cmIDB } from '../../../_db/cm-db';
import { EditableCom } from './com/EditableCom';

export function useEditableCcom(): EditableCom | und {
  const ccomw = +useParams().comw!;
  const icom = useLiveQuery(() => cmIDB.db.coms.where({ w: ccomw }).first());

  return useMemo(() => icom && new EditableCom(icom, 1), [icom]);
}
