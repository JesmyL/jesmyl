import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/entities/com';
import { cmComAudioPlayerHTMLElement, cmComAudioPlayerPlaySrcAtom } from '$cm/entities/com-audio-player';
import { makeCmComAudioMarkTitleBySelector } from '$cm/ext';
import { cmComTrackPreSwitchTimeAtom, cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComAudioMarkSelector, CmComOrderWid } from 'shared/api';
import { itIt } from 'shared/utils';

export const useCmComOrderAudioMarkControl = (
  isNeedCompute: boolean,
  com: CmCom,
  mapNode: (node: React.ReactNode, time: number, selector: CmComAudioMarkSelector) => React.ReactNode = itIt,
) => {
  const src = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(src);
  const actualMapNodeRef = useActualRef(mapNode);

  return useMemo(() => {
    const ordwPlayButtonNodeDict: PRecord<CmComOrderWid, React.ReactNode[]> = {};
    const afterTargetOrdwOtherPlayButtonNodeDict: PRecord<'before' | CmComOrderWid, React.ReactNode[]> = {};

    const result = {
      ordwPlayButtonNodeDict,
      afterTargetOrdwOtherPlayButtonNodeDict,
    };

    if (!isNeedCompute || audioTrackMarks?.marks == null) return result;

    let lastOrdwOrNull: 'before' | CmComOrderWid = 'before';
    const takeMinusTime = () => (cmComTrackPreSwitchTimeAtom.get() < 0 ? 0 : cmComTrackPreSwitchTimeAtom.get());

    MyLib.entries(audioTrackMarks.marks).forEach(([time, selector]) => {
      if (selector == null) return;

      if (mylib.isStr(selector)) {
        afterTargetOrdwOtherPlayButtonNodeDict[lastOrdwOrNull] ??= [];
        afterTargetOrdwOtherPlayButtonNodeDict[lastOrdwOrNull]?.push(
          actualMapNodeRef.current(
            <Button
              key={time}
              icon="PlayCircle"
              com-audio-mark-time-selector={time}
              onClick={event => {
                event.stopPropagation();
                cmComAudioPlayerHTMLElement.currentTime = +time - takeMinusTime();
                cmComAudioPlayerHTMLElement.play();
              }}
            >
              <span className="text-x3">
                {
                  makeCmComAudioMarkTitleBySelector(+time, com, selector, audioTrackMarks.marks, (repeats, title) => (
                    <span className="text-x7">
                      {repeats} {title}
                    </span>
                  )).title
                }
              </span>
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
            onClick={event => {
              event.stopPropagation();
              cmComAudioPlayerHTMLElement.currentTime = +time - takeMinusTime();
              cmComAudioPlayerHTMLElement.play();
            }}
          />,
          +time,
          selector,
        ),
      );
    });

    if (mylib.isArr(audioTrackMarks.marks?.[0])) delete afterTargetOrdwOtherPlayButtonNodeDict.before;

    return result;
  }, [isNeedCompute, audioTrackMarks?.marks, com, actualMapNodeRef]);
};
