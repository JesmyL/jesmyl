import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useParams } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';

export const useCcomw = () => +useParams({ from: '/cm/edit/coms/$comw/$tab' }).comw as CmComWid | NaN;

export const useEditableCcom = (): EditableCom | und => {
  const ccomw = useCcomw();
  const icom = useLiveQuery(() => cmIDB.db.coms.where({ w: ccomw }).first(), [ccomw]);

  return useMemo(() => icom && new EditableCom(icom), [icom]);
};

export const useEditableComs = () => {
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());

  return useMemo(() => icoms?.map(icom => new EditableCom(icom)), [icoms]);
};
