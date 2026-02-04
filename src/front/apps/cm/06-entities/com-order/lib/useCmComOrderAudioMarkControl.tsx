import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { MyLib, mylib } from '#shared/lib/my-lib';
import {
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
} from '$cm/entities/com-audio-player';
import { CmCom, makeCmComAudioMarkTitleBySelector } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { Atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComAudioMarkPackTime, CmComAudioMarkSelector, CmComOrderWid } from 'shared/api';
import { itIt } from 'shared/utils';

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
  const audioTrackMarks = cmIDB.useAudioTrackMarks(src);
  const actualMapNodeRef = useActualRef(mapNode);

  return useMemo(() => {
    const comMarks = audioTrackMarks?.cMarks?.[com.wid];
    const ordwPlayButtonNodeDict: PRecord<CmComOrderWid, React.ReactNode[]> = {};
    const afterTargetOrdwOtherPlayButtonNodeDict: PRecord<'before' | CmComOrderWid, React.ReactNode[]> = {};

    const result = {
      ordwPlayButtonNodeDict,
      afterTargetOrdwOtherPlayButtonNodeDict,
    };

    if (!isNeedCompute || comMarks == null) return result;

    let lastOrdwOrNull: 'before' | CmComOrderWid = 'before';
    const takeMinusTime = () => (preTimeAtom.get() < 0 ? 0 : preTimeAtom.get());

    MyLib.entries(comMarks).forEach(([time, selector]) => {
      const titleProps = makeCmComAudioMarkTitleBySelector(
        +time,
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

      if (selector == null || (isHideShortTime && titleProps.isShortTime)) return;
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
            +time,
            selector,
          ),
        );

        return;
      }

      const ordw = com.getOrderBySelector(selector[0]).ord?.wid;
      if (ordw == null) return;

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
          +time,
          selector,
        ),
      );
    });

    if (mylib.isArr(comMarks[0])) delete afterTargetOrdwOtherPlayButtonNodeDict.before;

    return result;
  }, [audioTrackMarks?.cMarks, isNeedCompute, preTimeAtom, com, isHideShortTime, actualMapNodeRef]);
};
