import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import {
  CmComLinei,
  CmComMod,
  CmComNewlinerRepeati,
  CmComNewlinerStrConfig,
  CmComNewlinerWordi,
  CmComNewlinerWordiNewLine,
  CmComNewlinerWordiNotNewLine,
  CmComNewlinerWordiZero,
  CmComOrderWid,
  CmComWid,
} from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { howMillisecondsInMin } from 'shared/const/ms';
import { TextCase } from 'shared/model/common';
import { absoluteNumber, multipliedNumber, nagativeNumber } from 'shared/utils';
import { checkIsNotNil } from 'shared/utils/checkIs';
import {
  cmComNewlinerLineConfigToSet,
  cmComNewlinerLineSetToNewlinerConfig,
  takeCmComNewlinerLineFullConfig,
  takeCmComNewlinerRepeatFullConfig,
} from 'shared/utils/cm/com/newliner';
import { arrayByLength, objectLength } from 'shared/utils/object.utils';
import { removeEmptyRightValues } from 'shared/utils/removeEmptyRightValues';
import { modifyCom } from './lib/modifiers';

type Sets = ReturnType<CmComOrder['makeNewlinerSets']>;

export const cmEditComServerTsjrpcNewlines = () =>
  ({
    switchNLWord: updateNewlinerLineSet(({ repeati, wordi }, itRepeati, set, getSets) => {
      if (itRepeati !== repeati) return;

      updateSetByHoldSet(getSets, set, wordi, repeati);

      if (set.has(wordi) || set.has(nagativeNumber(wordi))) {
        set.delete(wordi);
        set.delete(nagativeNumber(wordi));
      } else set.add(absoluteNumber(wordi));
    }),

    switchNLBr: updateNewlinerLineSet(({ repeati, wordi }, itRepeati, set, getSets) => {
      if (itRepeati !== repeati) return;

      if (updateSetByHoldSet(getSets, set, wordi, repeati)) {
        let del, add;

        if (set.has(wordi)) {
          del = wordi;
          add = nagativeNumber(wordi);
        } else if (set.has(nagativeNumber(wordi))) {
          del = nagativeNumber(wordi);
          add = wordi;
        } else add = multipliedNumber(absoluteNumber(wordi), !repeati ? -1 : 1);

        if (checkIsNotNil(add)) set.add(add);
        if (checkIsNotNil(del)) set.delete(del);
      }

      set.delete(CmComNewlinerWordiZero);
      if (!repeati) set.delete(CmComNewlinerWordiNotNewLine);
    }),

    removeNL: updateNewlinerLineSet(({ repeati }, itRepeati, set) => {
      if (repeati != null && itRepeati !== repeati) return;
      set.clear();
    }),
  }) satisfies ServerTsjrpcSatisfy<CmEditComTsjrpcModel>;

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const timers: PRecord<CmComWid, TimeOut> = {};
const retLabel = (comw: CmComWid) => {
  if (checkIsNotNil(timers[comw])) return null;

  timers[comw] = setTimeout(() => delete timers[comw], howMillisecondsInMin * 5);

  return 'настройка слайдов';
};

const updateSetByHoldSet = (
  getSets: () => Sets | nil,
  set: Set<CmComNewlinerWordi>,
  wordi: CmComNewlinerWordi,
  repeati: CmComNewlinerRepeati,
) => {
  let isNotFixed = true;

  const sets = getSets();
  if (sets) {
    const { holdSet, firstSet } = sets;

    if (!firstSet && !repeati) return isNotFixed;

    if (set.size) {
      if (wordi === CmComNewlinerWordiNotNewLine) {
        if (holdSet.has(CmComNewlinerWordiNewLine) && set.has(CmComNewlinerWordiNotNewLine)) {
          set.delete(CmComNewlinerWordiNotNewLine);
          set.add(CmComNewlinerWordiNewLine);

          isNotFixed = false;
        } else if (!holdSet.has(CmComNewlinerWordiNewLine) && set.has(CmComNewlinerWordiNewLine)) {
          set.delete(CmComNewlinerWordiNewLine);
          set.delete(CmComNewlinerWordiNotNewLine);

          isNotFixed = false;
        }
      }
    } else if (holdSet.size) {
      holdSet.forEach(num => set.add(num));

      if (wordi === CmComNewlinerWordiNotNewLine) {
        if (holdSet.has(CmComNewlinerWordiNewLine)) {
          set.add(CmComNewlinerWordiNotNewLine);
          set.delete(CmComNewlinerWordiNewLine);
        } else {
          set.add(CmComNewlinerWordiNewLine);
          set.delete(CmComNewlinerWordiNotNewLine);
        }

        isNotFixed = false;
      } else {
        if (holdSet.has(wordi)) {
          set.add(wordi);

          if (holdSet.has(CmComNewlinerWordiNewLine)) set.add(CmComNewlinerWordiNewLine);
          else set.add(CmComNewlinerWordiNotNewLine);
        }
      }
    }
  }

  return isNotFixed;
};

const updateNewlinerLineSet = <
  Props extends { comw: CmComWid; linei: CmComLinei; ordw: CmComOrderWid; repeati: CmComNewlinerRepeati | nil },
>(
  updater: (
    props: Props,
    currentRepeati: CmComNewlinerRepeati,
    set: Set<CmComNewlinerWordi>,
    getSets: () => Sets | nil,
  ) => void,
) =>
  modifyCom<Props>('COM_TR', (com, props) => {
    const { linei, ordw, repeati } = props;

    com.nl ??= [];
    com.nl[0] ??= {};

    const wholeNLConfig = com.nl[0]?.[ordw];
    const lineConfigList = takeCmComNewlinerLineFullConfig(wholeNLConfig);
    const repeatConfigList = takeCmComNewlinerRepeatFullConfig(wholeNLConfig, linei);

    arrayByLength(Math.max(repeatConfigList.length, (repeati || 0) + 1), itRepeati => {
      const set = cmComNewlinerLineConfigToSet(wholeNLConfig, linei, itRepeati as CmComNewlinerRepeati);
      updater(props, itRepeati as CmComNewlinerRepeati, set, () => {
        let sets: Sets | nil = null;

        new CmCom({ ...com, m: CmComMod.def, al: [] }, null, null).makeExpandLines(false, TextCase.AsIs).find(slide => {
          sets = slide.ord.makeNewlinerSets(slide.line, slide.linei, slide.repeati);

          return slide.ord.wid === ordw && slide.linei === linei && slide.repeati === itRepeati;
        });

        return sets;
      });

      repeatConfigList[itRepeati] = cmComNewlinerLineSetToNewlinerConfig(set);
    });

    removeEmptyRightValues(repeatConfigList, null, it => it || '');

    lineConfigList[linei] = repeatConfigList.join('/') as CmComNewlinerStrConfig.line;
    removeEmptyRightValues(lineConfigList, null, it => it || '');

    const repeatConfig = lineConfigList.join(' ') as CmComNewlinerStrConfig.whole;

    if (repeatConfig) com.nl[0][ordw] = repeatConfig;
    else delete com.nl[0][ordw];

    if (!objectLength(com.nl[0])) com.nl = [];

    return retLabel(com.w);
  });
