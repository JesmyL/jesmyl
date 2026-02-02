import { mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { useCmComInScheduleWid } from '$cm/shared/state/contexts';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';
import { cmComLastOpenComwAtom } from '../state/atoms';

export const useCmComCurrentFixedCom = (): CmCom | und => {
  const ccom = useCmComCurrent();
  const comw = ccom?.wid ?? CmComWid.def;
  const ifixedCom = useLiveQuery(() => mylib.isNNlButUnd(comw) && cmIDB.tb.fixedComs.get(+comw), [comw]);
  const schw = useCmComInScheduleWid();
  const schInterpretation = useLiveQuery(async () => schw && cmIDB.tb.scheduleComPacks.get(schw), [schw])?.intp;

  return useMemo(
    () => ccom && new CmCom({ ...ccom.top, ...ifixedCom }, schInterpretation?.[comw]),
    [ccom, schInterpretation, comw, ifixedCom],
  );
};

export const useCmCom = (comw: CmComWid | und, interpretationSchw?: IScheduleWidgetWid): CmCom | und => {
  const icom = useLiveQuery(() => mylib.isNNlButUnd(comw) && cmIDB.tb.coms.get(comw), [comw]);
  const schw = useCmComInScheduleWid() ?? interpretationSchw;
  const schInterpretation = useLiveQuery(async () => schw && cmIDB.tb.scheduleComPacks.get(schw), [schw])?.intp;

  return useMemo(() => icom && new CmCom(icom, schInterpretation?.[icom.w]), [schInterpretation, icom]);
};

export const useCmComLastOpenComw = () => useAtomValue(cmComLastOpenComwAtom);
export const useCmComCurrent = () => useCmCom(useAtomValue(cmComLastOpenComwAtom));
