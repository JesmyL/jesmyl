import { cmIDB } from '@cm/_db/cm-idb';
import { EditableCom } from '@cm/editor/lib/EditableCom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CmComWid } from 'shared/api';

export const useCcomw = () => +useParams().comw! as CmComWid | NaN;

export const useEditableCcom = (): EditableCom | und => {
  const ccomw = useCcomw();
  const icom = useLiveQuery(() => cmIDB.db.coms.where({ w: ccomw }).first(), [ccomw]);

  return useMemo(() => icom && new EditableCom(icom), [icom]);
};

export const useEditableComs = () => {
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icoms?.map(icom => new EditableCom(icom)), [icoms]);
};
