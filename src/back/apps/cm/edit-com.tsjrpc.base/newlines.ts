import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { CmComNewlinerStrConfig, CmComOrderWid, CmComWid, IServerSideCom } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { smylib } from 'shared/utils';
import { cmComNewlinerLineConfigToSet, cmComNewlinerLineSetToNewlinerConfig } from 'shared/utils/cm/com/newliner';
import { modifyCom } from './lib/modifiers';

export const cmEditComServerTsjrpcNewlines = {
  switchNLWord: modifyCom((com, { linei, wordi, ordw, repeati }) => {
    updateNewlinerLineSet(com, ordw, repeati, linei, set => {
      if (set.has(wordi) || set.has(-wordi)) {
        set.delete(wordi);
        set.delete(-wordi);
      } else set.add(Math.abs(wordi));
    });

    return retLabel(com.w);
  }),

  switchNLBr: modifyCom((com, { linei, wordi, ordw, repeati }) => {
    updateNewlinerLineSet(com, ordw, repeati, linei, set => {
      if (set.has(wordi)) {
        set.delete(wordi);
        set.add(-wordi);
      } else if (set.has(-wordi)) {
        set.delete(-wordi);
        set.add(wordi);
      } else set.add((!repeati ? -1 : 1) * Math.abs(wordi));

      set.delete(0);
      if (!repeati) set.delete(1);
    });

    return retLabel(com.w);
  }),

  removeNL: modifyCom((com, { linei, ordw, repeati }) => {
    updateNewlinerLineSet(com, ordw, repeati, linei, set => set.clear());

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
  repeati: number,
  linei: number,
  updater: (set: Set<number>) => void,
) => {
  com.nl ??= [{}];
  const wholeNLConfig = com.nl[0][ordw];
  const set = cmComNewlinerLineConfigToSet(wholeNLConfig, repeati, linei);
  const repeatConfigList = (wholeNLConfig?.split('/') ?? []) as (CmComNewlinerStrConfig.repeat | nil)[];
  const lineConfigList = (repeatConfigList[repeati]?.split(' ') ?? []) as (CmComNewlinerStrConfig.line | nil)[];

  updater(set);

  lineConfigList[linei] = cmComNewlinerLineSetToNewlinerConfig(set);
  checkFullValues(lineConfigList);
  repeatConfigList[repeati] = lineConfigList.join(' ') as CmComNewlinerStrConfig.repeat;
  checkFullValues(repeatConfigList);

  const repeatConfig = repeatConfigList.join('/') as CmComNewlinerStrConfig.whole;

  if (repeatConfig) com.nl[0][ordw] = repeatConfig;
  else delete com.nl[0][ordw];

  if (!smylib.keys(com.nl[0]).length) delete com.nl;
};

const checkFullValues = (list: (string | nil)[]) => {
  let isFullNotFound = true;

  for (let repeatConfigi = list.length - 1; repeatConfigi >= 0; repeatConfigi--) {
    list[repeatConfigi] ||= '' as CmComNewlinerStrConfig.repeat;

    if (isFullNotFound)
      if (list[repeatConfigi]) isFullNotFound = false;
      else list.pop();
  }
};
