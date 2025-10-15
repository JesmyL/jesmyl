import { Button } from '#shared/components/ui/button';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/entities/com';
import { cmComAudioPlayerHTMLElement, cmComAudioPlayerPlaySrcAtom } from '$cm/entities/com-audio-player';
import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComOrderWid } from 'shared/api';
import { itIt } from 'shared/utils';

export const useCmComOrderWidToPlayButtonNodeDict = (
  com: CmCom,
  mapNode: (node: React.ReactNode, time: number) => React.ReactNode = itIt,
) => {
  const src = useAtomValue(cmComAudioPlayerPlaySrcAtom);
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
              cmComAudioPlayerHTMLElement.currentTime = +time;
              cmComAudioPlayerHTMLElement.play();
            }}
          />,
          +time,
        ),
      );
    });

    return result;
  }, [audioTrackMarks?.marks, com, actualMapNodeRef]);
};
