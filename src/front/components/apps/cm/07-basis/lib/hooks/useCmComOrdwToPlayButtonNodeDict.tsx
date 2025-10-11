import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { Com } from '$cm/col/com/Com';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComOrderWid } from 'shared/api';
import { itIt } from 'shared/utils';
import { comPlayerAudioElement, comPlayerPlaySrcAtom } from '../control/current-play-com';
import { cmIDB } from '../store/cmIDB';

export const useCmComOrdwToPlayButtonNodeDict = (
  com: Com,
  mapNode: (node: React.ReactNode, time: number) => React.ReactNode = itIt,
) => {
  const src = useAtomValue(comPlayerPlaySrcAtom);
  const audioTrackMarks = cmIDB.useAudioTrackMarks(src);
  const actualMapNodeRef = useActualRef(mapNode);

  return useMemo(() => {
    if (audioTrackMarks?.marks == null) return null;
    const result: PRecord<CmComOrderWid, React.ReactNode[]> = {};

    MyLib.entries(audioTrackMarks.marks).forEach(([time, selector]) => {
      if (selector == null || mylib.isStr(selector)) return;

      const ordw = com.getOrderBySelector(selector[0])?.wid;
      if (ordw == null) return;

      result[ordw] ??= [];
      result[ordw].push(
        actualMapNodeRef.current(
          <Button
            key={time}
            icon="PlayCircle"
            com-audio-mark-selector={`${time}/${selector[0]}`}
            onClick={event => {
              event.stopPropagation();
              comPlayerAudioElement.currentTime = +time;
              comPlayerAudioElement.play();
            }}
          />,
          +time,
        ),
      );
    });

    return result;
  }, [audioTrackMarks?.marks, com, actualMapNodeRef]);
};
