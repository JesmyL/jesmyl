import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/entities/com';
import { cmComAudioPlayerHTMLElement, cmComAudioPlayerPlaySrcAtom } from '$cm/entities/com-audio-player';
import { makeCmComAudioMarkTitleBySelector } from '$cm/ext';
import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComAudioMarkSelector, CmComOrderWid } from 'shared/api';
import { itIt } from 'shared/utils';
import { CmComOrder } from './Order';

export const useCmComOrderWidToPlayButtonNodeDict = (
  com: CmCom,
  mapNode: (node: React.ReactNode, time: number, selector: CmComAudioMarkSelector) => React.ReactNode = itIt,
) => {
  const src = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(src);
  const actualMapNodeRef = useActualRef(mapNode);

  return useMemo(() => {
    const ordwPlayButtonNodeDict: PRecord<CmComOrderWid, React.ReactNode[]> = {};
    const afterOrdwOtherPlayButtonNodeDict: PRecord<'before' | CmComOrderWid, React.ReactNode[]> = {};

    const result = {
      ordwPlayButtonNodeDict,
      afterOrdwOtherPlayButtonNodeDict,
      asContentAfterOrder: ({ ord }: { ord: CmComOrder }) => {
        return (
          !ord.me.next?.me.style?.isHeaderNoneForce &&
          (ord.me.isAnchorInheritPlus && ord.me.leadOrd != null
            ? afterOrdwOtherPlayButtonNodeDict[ord.me.leadOrd.makeSelector()]
            : afterOrdwOtherPlayButtonNodeDict[ord.makeSelector()])
        );
      },
    };

    if (audioTrackMarks?.marks == null) return result;

    let lastOrdwOrNull: 'before' | CmComOrderWid = 'before';

    MyLib.entries(audioTrackMarks.marks).forEach(([time, selector]) => {
      if (selector == null) return;

      if (mylib.isStr(selector)) {
        afterOrdwOtherPlayButtonNodeDict[lastOrdwOrNull] ??= [];
        afterOrdwOtherPlayButtonNodeDict[lastOrdwOrNull]?.push(
          actualMapNodeRef.current(
            <Button
              key={time}
              icon="PlayCircle"
              com-audio-mark-time-selector={time}
              onClick={event => {
                event.stopPropagation();
                cmComAudioPlayerHTMLElement.currentTime = +time;
                cmComAudioPlayerHTMLElement.play();
              }}
            >
              {
                makeCmComAudioMarkTitleBySelector(
                  +time,
                  com,
                  selector,
                  audioTrackMarks.marks,
                  false,
                  (repeats, title) => (
                    <>
                      {repeats} <span className="text-x3">{title}</span>
                    </>
                  ),
                ).title
              }
            </Button>,
            +time,
            selector,
          ),
        );
        return;
      }

      const ordw = com.getOrderBySelector(selector[0])?.wid;
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
              cmComAudioPlayerHTMLElement.currentTime = +time;
              cmComAudioPlayerHTMLElement.play();
            }}
          />,
          +time,
          selector,
        ),
      );
    });

    if (mylib.isArr(audioTrackMarks.marks?.[0])) delete afterOrdwOtherPlayButtonNodeDict.before;

    return result;
  }, [audioTrackMarks?.marks, com, actualMapNodeRef]);
};
