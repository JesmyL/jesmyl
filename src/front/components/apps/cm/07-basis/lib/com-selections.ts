import { contextCreator } from '#shared/lib/contextCreator';
import { mylib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { Com } from '../../col/com/Com';
import { cmLastOpenComwAtom } from './store/atoms';

export const useFixedCcom = (): Com | und => {
  const ccom = useCcom();
  const comw = ccom?.wid ?? CmComWid.def;
  const ifixedCom = useLiveQuery(() => mylib.isNNlButUnd(comw) && cmIDB.tb.fixedComs.get(+comw), [comw]);

  return useMemo(() => ccom && new Com({ ...ccom.top, ...ifixedCom }), [ccom, ifixedCom]);
};

export const useCom = (comw: CmComWid | und): Com | und => {
  const icom = useLiveQuery(() => mylib.isNNlButUnd(comw) && cmIDB.tb.coms.get(comw), [comw]);

  return useMemo(() => icom && new Com(icom), [icom]);
};

export const useLastOpenComw = () => useAtomValue(cmLastOpenComwAtom);

export const [CmCurrentComContext, useCcom] = contextCreator<Com | und>(undefined);
