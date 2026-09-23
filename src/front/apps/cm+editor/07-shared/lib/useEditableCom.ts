import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { cmIDB } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { EditableCom } from '../classes/EditableCom';

export const useEditableCcom = (comw: CmComWid): EditableCom | und => {
  const icom = useLiveQuery(() => cmIDB.db.coms.where({ w: comw }).first(), [comw]);
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);

  return useMemo(() => icom && new EditableCom(icom, null, null, isHardChords), [icom, isHardChords]);
};

export const useEditableComs = () => {
  const icoms = useLiveQuery(() => cmIDB.db.coms.toArray());
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);

  return useMemo(() => icoms?.map(icom => new EditableCom(icom, null, null, isHardChords)), [icoms, isHardChords]);
};
