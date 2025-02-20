import { cmIDB } from '@cm/shared/lib/cmIdb';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import { EditableCom } from './com/EditableCom';

export const useCcomw = () => +useParams().comw! as CmComWid | NaN;

export function useEditableCcom(): EditableCom | und {
  const ccomw = useCcomw();
  const icom = useLiveQuery(() => cmIDB.db.coms.where({ w: ccomw }).first(), [ccomw]);

  return useMemo(() => icom && new EditableCom(icom), [icom]);
}
