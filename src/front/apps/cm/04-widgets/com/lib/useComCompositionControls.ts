import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useCmComLaterList } from '$cm/entities/com';
import {
  cmComAudioPlayerGetSrc,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerSetSrc,
} from '$cm/entities/com-audio-player';
import { CmCom } from '$cm/ext';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useEffect, useRef } from 'react';

export const useCmComCompositionControls = (ccom: CmCom | nil) => {
  const { addLaterComw, laterComws } = useCmComLaterList();
  const comListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ccom?.wid == null) return;
    if (comListRef.current) comListRef.current.scrollTop = 0;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => addLaterComw(ccom.wid), 3000),
        setTimeoutPipe(() => cmTsjrpcClient.printComwVisit({ comw: ccom.wid }), 77_777),
      )
      .effect();
  }, [addLaterComw, ccom?.wid]);

  useEffect(() => {
    if (!cmComAudioPlayerIsPlayAtom.get() && !ccom?.audio.includes(cmComAudioPlayerGetSrc()!)) {
      if (ccom?.audio[0]) cmComAudioPlayerSetSrc(ccom.audio[0]);
    }
  }, [ccom?.audio]);

  return { laterComws, comListRef };
};
