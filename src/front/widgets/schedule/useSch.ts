import { mylib } from '#shared/lib/my-lib';
import { indexIDB } from '$index/shared/state/index-idb';
import { useEffect } from 'react';
import { ScheduleWidgetWid } from 'shared/api';

export const useFixActualSchw = (schw: ScheduleWidgetWid | NaN) => {
  useEffect(() => {
    if (mylib.isNaN(schw)) return;
    indexIDB.set.lastScheduleWid(schw);
  }, [schw]);
};

export const useActualSchw = (): ScheduleWidgetWid | NaN => indexIDB.useValue.lastScheduleWid();
