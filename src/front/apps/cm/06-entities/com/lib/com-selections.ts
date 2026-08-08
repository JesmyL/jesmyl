import { cmIDB } from '$cm/shared/state';
import { useCmComInScheduleWid } from '$cm/shared/state/contexts';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid, ScheduleWidgetWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { cmComLastOpenComwAtom } from '../state/atoms';

const und = undefined;

export const useCmComCurrentFixedCom = (): CmCom | und => {
  const comw = useCmComLastOpenComw();
  const icom = useLiveQuery(() => (comw ? cmIDB.tb.coms.get(comw) : und), [comw]);
  const ifixedCom = useLiveQuery(() => (comw ? cmIDB.tb.fixedComs.get(comw) : und), [comw]);
  const schw = useCmComInScheduleWid();
  const schIntp = useLiveQuery(() => (schw ? cmIDB.tb.scheduleComIntp.get(schw) : und), [schw])?.intp;

  return useMemo(() => icom && new CmCom(icom, ifixedCom, schIntp?.[icom.w]), [icom, schIntp, ifixedCom]);
};

export const useCmComOrCurrent = (comw: CmComWid | und, interpretationSchw?: ScheduleWidgetWid): CmCom | und => {
  const ccomw = useCmComLastOpenComw();
  return useCmCom(comw?? ccomw, interpretationSchw)
}

export const useCmCom = (comw: CmComWid | und, interpretationSchw?: ScheduleWidgetWid): CmCom | und => {
  const icom = useLiveQuery(() => (comw ? cmIDB.tb.coms.get(comw) : und), [comw]);
  const schw = useCmComInScheduleWid() ?? interpretationSchw;
  const schIntp = useLiveQuery(() => (schw ? cmIDB.tb.scheduleComIntp.get(schw) : und), [schw])?.intp;

  return useMemo(() => icom && new CmCom(icom, und, schIntp?.[icom.w]), [schIntp, icom]);
};

export const useCmComLastOpenComw = () => useAtomValue(cmComLastOpenComwAtom);
export const useCmComCurrent = () => useCmCom(useCmComLastOpenComw());
