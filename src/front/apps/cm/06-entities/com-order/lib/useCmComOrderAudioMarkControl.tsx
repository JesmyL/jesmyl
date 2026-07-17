import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import {
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
} from '$cm/entities/com-audio-player';
import { cmIDB } from '$cm/shared/state';
import { Atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComAudioMarkPackTime, CmComAudioMarkSelector, CmComOrderWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleBySelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { extractNumber, itIt } from 'shared/utils';
import { checkIsArray, checkIsNil } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';

export const useCmComOrderAudioMarkControlButtons = (
  preTimeAtom: Atom<number>,
  isNeedCompute: boolean,
  com: CmCom,
  isHideShortTime: boolean,
  mapNode: (
    node: React.ReactNode,
    time: CmComAudioMarkPackTime,
    selector: CmComAudioMarkSelector,
  ) => React.ReactNode = itIt,
) => {
  const src = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(com.wid);
  const actualMapNodeRef = useActualRef(mapNode);

  return useMemo(() => {
    const comMarks = src ? audioTrackMarks?.marks?.[src] : null;
    const ordwPlayButtonNodeDict: PRecord<CmComOrderWid, React.ReactNode[]> = {};
    const afterTargetOrdwOtherPlayButtonNodeDict: PRecord<'before' | CmComOrderWid, React.ReactNode[]> = {};

    const result = {
      ordwPlayButtonNodeDict,
      afterTargetOrdwOtherPlayButtonNodeDict,
    };

    if (!isNeedCompute || checkIsNil(comMarks)) return result;

    let lastOrdwOrNull: 'before' | CmComOrderWid = 'before';
    const takeMinusTime = () => (preTimeAtom.get() < 0 ? 0 : preTimeAtom.get());

    forEachObjectEntries(comMarks, (time, selector) => {
      const titleProps = makeCmComAudioMarkTitleBySelector(
        extractNumber(time),
        com,
        selector,
        comMarks,
        (repeats, title) => (
          <span className="text-x7">
            {repeats} {title}
          </span>
        ),
        title => (title.startsWith('+') ? title.slice(1) : title),
      );

      if (checkIsNil(selector) || (isHideShortTime && titleProps.isShortTime)) return;
      const className = titleProps.isShortTime ? 'text-xKO' : undefined;

      if (mylib.isStr(selector)) {
        if (selector === '-') return;

        afterTargetOrdwOtherPlayButtonNodeDict[lastOrdwOrNull] ??= [];
        afterTargetOrdwOtherPlayButtonNodeDict[lastOrdwOrNull]?.push(
          actualMapNodeRef.current(
            <Button
              key={time}
              icon="PlayCircle"
              com-audio-mark-time-selector={time}
              className={className}
              onClick={event => {
                event.stopPropagation();
                cmComAudioPlayerUpdateCurrentTime(+time - takeMinusTime());
                cmComAudioPlayerSwitchIsPlay(true);
              }}
            >
              <span className={className ?? 'text-x3'}>{titleProps.title}</span>
            </Button>,
            extractNumber(time),
            selector,
          ),
        );

        return;
      }

      const ordw = com.getOrd(selector[0]).ord?.wid;
      if (checkIsNil(ordw)) return;

      lastOrdwOrNull = ordw;

      ordwPlayButtonNodeDict[ordw] ??= [];
      ordwPlayButtonNodeDict[ordw].push(
        actualMapNodeRef.current(
          <Button
            key={time}
            icon="PlayCircle"
            com-audio-mark-time-selector={time}
            className={className}
            onClick={event => {
              event.stopPropagation();
              cmComAudioPlayerUpdateCurrentTime(+time - takeMinusTime());
              cmComAudioPlayerSwitchIsPlay(true);
            }}
          />,
          extractNumber(time),
          selector,
        ),
      );
    });

    if (checkIsArray(comMarks[0 as CmComAudioMarkPackTime])) delete afterTargetOrdwOtherPlayButtonNodeDict.before;

    return result;
  }, [src, audioTrackMarks?.marks, isNeedCompute, preTimeAtom, com, isHideShortTime, actualMapNodeRef]);
};
