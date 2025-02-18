import { indexIDB } from '#basis/lib/idb/index/index';
import { mylib } from 'front/utils';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { IScheduleWidgetWid } from 'shared/api';

export const useCschw = (): IScheduleWidgetWid | NaN => {
  const paramSchw = +useParams().schw!;
  const searchParamSchw = +useSearchParams()[0].get('schw')!;

  const schw = isNaN(searchParamSchw) ? searchParamSchw : paramSchw;

  return schw;
};

export const useFixActualSchw = (schw: IScheduleWidgetWid | NaN) => {
  useEffect(() => {
    if (mylib.isNaN(schw)) return;
    indexIDB.set.lastScheduleWid(schw);
  }, [schw]);
};

export const useActualSchw = (): IScheduleWidgetWid | NaN => indexIDB.useValue.lastScheduleWid();
