import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import {
  CmComNewlinerLinei,
  CmComNewlinerRepeati,
  CmComNewlinerStrConfig,
  CmComOrderWid,
  CmComWid,
  IServerSideCom,
} from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { itNNull, smylib } from 'shared/utils';
import {
  cmComNewlinerLineConfigToSet,
  cmComNewlinerLineSetToNewlinerConfig,
  takeCmComNewlinerLineFullConfig,
  takeCmComNewlinerRepeatFullConfig,
} from 'shared/utils/cm/com/newliner';
import { modifyCom } from './lib/modifiers';

export const cmEditComServerTsjrpcNewlines = {
  switchNLWord: modifyCom((com, { linei, wordi, ordw, repeati }) => {
    updateNewlinerLineSet(com, ordw, linei, repeati, (itRepeati, set) => {
      if (itRepeati !== repeati) return;

      if (set.has(wordi) || set.has(-wordi)) {
        set.delete(wordi);
        set.delete(-wordi);
      } else set.add(Math.abs(wordi));
    });

    return retLabel(com.w);
  }),

  switchNLBr: modifyCom((com, { linei, wordi, ordw, repeati }) => {
    updateNewlinerLineSet(com, ordw, linei, repeati, (itRepeati, set) => {
      if (itRepeati !== repeati) return;

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
    updateNewlinerLineSet(com, ordw, linei, repeati, (itRepeati, set) => {
      if (repeati != null && itRepeati !== repeati) return;
      set.clear();
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
  linei: CmComNewlinerLinei,
  repeati: CmComNewlinerRepeati | nil,
  updater: (repeati: CmComNewlinerRepeati, set: Set<number>) => void,
) => {
  com.nl ??= [{}];
  const wholeNLConfig = com.nl[0][ordw];
  const lineConfigList = takeCmComNewlinerLineFullConfig(wholeNLConfig);
  const repeatConfigList = takeCmComNewlinerRepeatFullConfig(wholeNLConfig, linei);

  Array.from({ length: Math.max(repeatConfigList.length, (repeati || 0) + 1) }, itNNull).forEach((_, repeati) => {
    const set = cmComNewlinerLineConfigToSet(wholeNLConfig, linei, repeati);
    updater(repeati, set);

    repeatConfigList[repeati] = cmComNewlinerLineSetToNewlinerConfig(set);
  });

  checkFullValues(repeatConfigList);

  lineConfigList[linei] = repeatConfigList.join('/') as CmComNewlinerStrConfig.line;
  checkFullValues(lineConfigList);

  const repeatConfig = lineConfigList.join(' ') as CmComNewlinerStrConfig.whole;

  if (repeatConfig) com.nl[0][ordw] = repeatConfig;
  else delete com.nl[0][ordw];

  if (!smylib.keys(com.nl[0]).length) delete com.nl;
};

const checkFullValues = (list: (string | nil)[]) => {
  let isFullNotFound = true;

  for (let repeatConfigi = list.length - 1; repeatConfigi >= 0; repeatConfigi--) {
    list[repeatConfigi] ||= '';

    if (isFullNotFound)
      if (list[repeatConfigi]) isFullNotFound = false;
      else list.pop();
  }
};
