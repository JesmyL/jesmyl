import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import {
  CmComMod,
  CmComNewlinerLinei,
  CmComNewlinerRepeati,
  CmComNewlinerStrConfig,
  CmComNewlinerWordi,
  CmComOrderWid,
  CmComWid,
} from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { howMillisecondsInMin } from 'shared/const/ms';
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

      if (set.has(wordi) || set.has(-wordi)) {
        set.delete(wordi);
        set.delete(-wordi);
      } else set.add(Math.abs(wordi));
    }),

    switchNLBr: updateNewlinerLineSet(({ repeati, wordi }, itRepeati, set, getSets) => {
      if (itRepeati !== repeati) return;

      if (updateSetByHoldSet(getSets, set, wordi, repeati)) {
        let del, add;

        if (set.has(wordi)) {
          del = wordi;
          add = -wordi;
        } else if (set.has(-wordi)) {
          del = -wordi;
          add = wordi;
        } else add = (!repeati ? -1 : 1) * Math.abs(wordi);

        if (checkIsNotNil(add)) set.add(add);
        if (checkIsNotNil(del)) set.delete(del);
      }

      set.delete(0);
      if (!repeati) set.delete(1);
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
  if (timers[comw] != null) return null;

  timers[comw] = setTimeout(() => delete timers[comw], howMillisecondsInMin * 5);

  return 'настройка слайдов';
};

const updateSetByHoldSet = (
  getSets: () => Sets | nil,
  set: Set<number>,
  wordi: CmComNewlinerWordi,
  repeati: CmComNewlinerRepeati,
) => {
  let isNotFixed = true;

  const sets = getSets();
  if (sets) {
    const { holdSet, firstSet } = sets;

    if (!firstSet && !repeati) return isNotFixed;

    if (set.size) {
      if (wordi === 1) {
        if (holdSet.has(-1) && set.has(1)) {
          set.delete(1);
          set.add(-1);

          isNotFixed = false;
        } else if (!holdSet.has(-1) && set.has(-1)) {
          set.delete(-1);
          set.delete(1);

          isNotFixed = false;
        }
      }
    } else if (holdSet.size) {
      holdSet.forEach(num => set.add(num));

      if (wordi === 1) {
        if (holdSet.has(-1)) {
          set.add(1);
          set.delete(-1);
        } else {
          set.add(-1);
          set.delete(1);
        }

        isNotFixed = false;
      } else {
        if (holdSet.has(wordi)) {
          set.add(wordi);

          if (holdSet.has(-1)) set.add(-1);
          else set.add(1);
        }
      }
    }
  }

  return isNotFixed;
};

const updateNewlinerLineSet = <
  Props extends { comw: CmComWid; linei: CmComNewlinerLinei; ordw: CmComOrderWid; repeati: CmComNewlinerRepeati | nil },
>(
  updater: (props: Props, currentRepeati: CmComNewlinerRepeati, set: Set<number>, getSets: () => Sets | nil) => void,
) =>
  modifyCom<Props>((com, props) => {
    const { linei, ordw, repeati } = props;

    com.nl ??= [{}];
    const wholeNLConfig = com.nl[0][ordw];
    const lineConfigList = takeCmComNewlinerLineFullConfig(wholeNLConfig);
    const repeatConfigList = takeCmComNewlinerRepeatFullConfig(wholeNLConfig, linei);

    arrayByLength(Math.max(repeatConfigList.length, (repeati || 0) + 1), itRepeati => {
      const set = cmComNewlinerLineConfigToSet(wholeNLConfig, linei, itRepeati);
      updater(props, itRepeati, set, () => {
        let sets: Sets | nil = null;

        new CmCom({ ...com, m: CmComMod.def, al: [] }, null, null).makeExpandLines(false).find(slide => {
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

    if (!objectLength(com.nl[0])) delete com.nl;

    return retLabel(com.w);
  });
