import { cmIDB } from '$cm/ext';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { EditableCom } from '../classes/EditableCom';

export const useEditableCcom = (comw: CmComWid): EditableCom | und => {
  const icom = useLiveQuery(() => cmIDB.db.coms.where({ w: comw }).first(), [comw]);

  return useMemo(() => icom && new EditableCom(icom), [icom]);
};

export const useEditableComs = () => {
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icoms?.map(icom => new EditableCom(icom)), [icoms]);
};
