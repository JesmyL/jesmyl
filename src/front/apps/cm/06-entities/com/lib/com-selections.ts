import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { CmComWid, IExportableCom, ScheduleWidgetWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { cmComLastOpenComwAtom, cmComLastOpenSchwAtom } from '../state/atoms';

const und = undefined;

export const useCmComOrCurrent = (comw: CmComWid | und, interpretationSchw?: ScheduleWidgetWid): CmCom | und => {
  const ccomw = useCmComLastOpenComw();
  return useCmCom(comw ?? ccomw, interpretationSchw);
};

export const useCmCom = (comw: CmComWid | und, interpretationSchw?: ScheduleWidgetWid): CmCom | und => {
  const icom = useLiveQuery(() => (comw ? cmIDB.tb.coms.get(comw) : und), [comw]);
  return useCmComMapFromICom(icom, interpretationSchw);
};

export const useCmComMapFromICom = (icom: IExportableCom | und, interpretationSchw?: ScheduleWidgetWid) => {
  const schIntp = useCurrentSchIntps(interpretationSchw);
  const ifixedCom = useComFixes(icom?.w);

  return useMemo(() => icom && new CmCom(icom, ifixedCom, schIntp?.[icom.w]), [icom, ifixedCom, schIntp]);
};

export const useCmComMapFromIComWithoutComFixes = (
  icom: IExportableCom | und,
  interpretationSchw?: ScheduleWidgetWid,
) => {
  const schIntp = useCurrentSchIntps(interpretationSchw);
  return useMemo(() => icom && new CmCom(icom, null, schIntp?.[icom.w]), [icom, schIntp]);
};

export const useCmComLastOpenComw = () => useAtomValue(cmComLastOpenComwAtom);
export const useCmComCurrent = () => useCmCom(useCmComLastOpenComw());

/////

const useComFixes = (comw?: CmComWid | nil) => {
  return useLiveQuery(() => (comw ? cmIDB.tb.fixedComs.get(comw) : und), [comw]);
};

const useCurrentSchIntps = (interpretationSchw?: ScheduleWidgetWid) => {
  let schw = useAtomValue(cmComLastOpenSchwAtom);
  schw = interpretationSchw ?? schw;

  return useLiveQuery(() => (schw ? cmIDB.tb.scheduleComIntp.get(schw) : und), [schw])?.intp;
};
