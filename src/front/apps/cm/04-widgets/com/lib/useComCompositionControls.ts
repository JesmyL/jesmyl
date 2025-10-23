import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { CmCom, useCmComLaterList } from '$cm/entities/com';
import { cmComAudioPlayerIsPlayAtom, cmComAudioPlayerPlaySrcAtom } from '$cm/entities/com-audio-player';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useEffect, useRef } from 'react';

export const useCmComCompositionControls = (ccom: CmCom | nil) => {
  const { addLaterComw, laterComws } = useCmComLaterList();
  const comListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ccom?.wid == null) return;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => addLaterComw(ccom.wid), 3000),
        setTimeoutPipe(() => cmTsjrpcClient.printComwVisit({ comw: ccom.wid }), 77_777),
      )
      .effect();
  }, [addLaterComw, ccom?.wid]);

  useEffect(() => {
    if (comListRef.current) comListRef.current.scrollTop = 0;

    if (!cmComAudioPlayerIsPlayAtom.get() && !ccom?.audio.includes(cmComAudioPlayerPlaySrcAtom.get()!)) {
      if (ccom?.audio[0]) cmComAudioPlayerPlaySrcAtom.set(ccom.audio[0]);
    }
  }, [ccom?.audio, ccom?.wid]);

  return { laterComws, comListRef };
};
