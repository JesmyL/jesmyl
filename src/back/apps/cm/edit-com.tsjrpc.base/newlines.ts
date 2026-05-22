import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { CmComNewlinerStrConfig, CmComOrderWid, CmComWid, IServerSideCom } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { smylib } from 'shared/utils';
import {
  cmComNewlinerLineNewlinerConfigToSet,
  cmComNewlinerLineSetToNewlinerConfig,
} from 'shared/utils/cm/com/newliner';
import { modifyCom } from './lib/modifiers';

export const cmEditComServerTsjrpcNewlines = {
  pullNewlinerLineConfig: modifyCom((com, { linei, ordw, watchOrdw }) => {
    com.nl ??= [{}];

    const ordConfig = com.nl[0][ordw];
    const watchOrdConfig = com.nl[0][watchOrdw];
    const ordNewlines = ordConfig?.split(' ') ?? [];
    const watchOrdNewlines = watchOrdConfig?.split(' ') ?? [];

    ordNewlines[linei] = watchOrdNewlines[linei];

    com.nl[0][ordw] = ordNewlines.join(' ') as CmComNewlinerStrConfig;

    return retLabel(com.w);
  }),

  switchNewlinerWord: modifyCom((com, { linei, wordi, ordw }) => {
    updateNewlinerLineSet(com, ordw, linei, set => {
      if (set.has(wordi) || set.has(-wordi)) {
        set.delete(wordi);
        set.delete(-wordi);
      } else set.add(Math.abs(wordi));
    });

    return retLabel(com.w);
  }),

  switchNewlinerBr: modifyCom((com, { linei, wordi, ordw }) => {
    updateNewlinerLineSet(com, ordw, linei, set => {
      if (set.has(wordi)) {
        set.delete(wordi);
        set.add(-wordi);
      } else if (set.has(-wordi)) {
        set.delete(-wordi);
        set.add(wordi);
      } else set.add(-Math.abs(wordi));

      set.delete(0);
      set.delete(1);
    });

    return retLabel(com.w);
  }),
} satisfies ServerTsjrpcSatisfy<CmEditComTsjrpcModel>;

const retLabel = (comw: CmComWid) => {
  if (timers[comw] != null) return null;

  timers[comw] = setTimeout(() => delete timers[comw], smylib.howMs.inMin * 5);

  return 'настройка слайдов';
};

const timers: PRecord<CmComWid, TimeOut> = {};

const updateNewlinerLineSet = (
  com: IServerSideCom,
  ordw: CmComOrderWid,
  linei: number,
  updater: (set: Set<number>) => void,
) => {
  com.nl ??= [{}];
  const ordConfig = com.nl[0][ordw];
  const set = cmComNewlinerLineNewlinerConfigToSet(ordConfig, linei);
  const textNewlines = ordConfig?.split(' ') ?? [];

  updater(set);

  textNewlines[linei] = cmComNewlinerLineSetToNewlinerConfig(set);
  let isFullLineNotFound = true;

  for (let i = textNewlines.length - 1; i >= 0; i--) {
    textNewlines[i] ||= '';

    if (isFullLineNotFound)
      if (textNewlines[i]) isFullLineNotFound = false;
      else textNewlines.pop();
  }

  const lineConfig = textNewlines.join(' ') as CmComNewlinerStrConfig;
  if (lineConfig) com.nl[0][ordw] = lineConfig;
  else delete com.nl[0][ordw];

  if (!smylib.keys(com.nl[0]).length) delete com.nl;
};
