import { contextCreator } from '#shared/lib/contextCreator';
import { mylib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { cmComLastOpenComwAtom } from '../state/atoms';
import { CmCom } from './Com';

export const useCmComCurrentFixedCom = (): CmCom | und => {
  const ccom = useCmComCurrent();
  const comw = ccom?.wid ?? CmComWid.def;
  const ifixedCom = useLiveQuery(() => mylib.isNNlButUnd(comw) && cmIDB.tb.fixedComs.get(+comw), [comw]);

  return useMemo(() => ccom && new CmCom({ ...ccom.top, ...ifixedCom }), [ccom, ifixedCom]);
};

export const useCmCom = (comw: CmComWid | und): CmCom | und => {
  const icom = useLiveQuery(() => mylib.isNNlButUnd(comw) && cmIDB.tb.coms.get(comw), [comw]);

  return useMemo(() => icom && new CmCom(icom), [icom]);
};

export const useCmComLastOpenComw = () => useAtomValue(cmComLastOpenComwAtom);

export const [CmComCurrentContext, useCmComCurrent] = contextCreator<CmCom | und>(undefined);
