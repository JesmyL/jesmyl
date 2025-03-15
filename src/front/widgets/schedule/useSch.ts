import { mylib } from '#shared/lib/my-lib';
import { indexIDB } from '$index/db/index-idb';
import { useEffect } from 'react';
import { IScheduleWidgetWid } from 'shared/api';

export const useFixActualSchw = (schw: IScheduleWidgetWid | NaN) => {
  useEffect(() => {
    if (mylib.isNaN(schw)) return;
    indexIDB.set.lastScheduleWid(schw);
  }, [schw]);
};

export const useActualSchw = (): IScheduleWidgetWid | NaN => indexIDB.useValue.lastScheduleWid();
