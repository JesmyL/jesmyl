import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { ScheduleWidgetWid, ScheduleWidgetWidNone } from 'shared/api';
import { checkIsNaN, checkIsNil } from 'shared/utils/checkIs';

const schwAtom = atom(ScheduleWidgetWidNone);

export const useFixActualSchw = (schw: ScheduleWidgetWid | nil) => {
  useEffect(() => {
    if (checkIsNaN(schw) || checkIsNil(schw)) return;
    schwAtom.set(schw);
  }, [schw]);
};

export const useActualSchw = (): ScheduleWidgetWid | nil => useAtomValue(schwAtom);
