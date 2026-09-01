import { ScreenBroadcastControlPanel } from '#features/broadcast/controls/ControllPanel';
import { useWatchScreenBroadcast } from '#features/broadcast/hooks/watch-broadcast';
import { Button, ButtonGroup } from '#shared/components';
import { useCmComCurrent } from '$cm/entities/com';
import {
  CmComAudioPlayerPlayButton,
  cmComAudioPlayerSetSrc,
  CmComAudioPlayerTrack,
} from '$cm/entities/com-audio-player';
import { CmComAudioPlayerMarksMovers, cmPlayerBroadcastAudioSrcAtom } from '$cm/ext';
import { getCmComFreshAudioMarksPack } from '$cm/shared/lib/getFresh';
import { cmComTrackPreSwitchTimeAtom, cmIDB } from '$cm/shared/state';
import { cmPlayerBroadcastComwAtom } from '$cm/shared/state/broadcast.atoms';
import { ReactNode } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { checkIsNil } from 'shared/utils/checkIs';

export const CmBroadcastAudioLine = ({ topNode }: { topNode: (nodes?: ReactNode) => ReactNode }) => {
  const broadcastSrc = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const com = useCmComCurrent();
  const watchBroadcast = useWatchScreenBroadcast();
  const comAudio = com?.audio;
  const firstSrc = comAudio?.[0];
  const comw = com?.wid;
  const isNoMarks = checkIsNil(cmIDB.useAudioTrackMarks(comw)?.marks?.[broadcastSrc!]);

  useEffect(() => {
    cmPlayerBroadcastAudioSrcAtom.set(prev => {
      if (prev && comAudio?.includes(prev)) return prev;

      return firstSrc ?? null;
    });
  }, [comAudio, firstSrc]);

  useEffect(() => {
    if (comw) getCmComFreshAudioMarksPack(comw);
  }, [comw]);

  if (!com)
    return (
      <>
        {topNode()}
        <div className="flex items-center justify-center w-full h-[30%]">Выберите песню</div>
      </>
    );

  const buttons = comAudio && comAudio.length > 1 && (
    <ButtonGroup.Root>
      {comAudio.map(src => (
        <Button
          key={src}
          icon="ComputerVideo"
          withoutAnimation
          className={broadcastSrc === src ? 'text-x7' : ''}
          onClick={() => {
            cmPlayerBroadcastComwAtom.set(com.wid);
            cmComAudioPlayerSetSrc(src);
            cmPlayerBroadcastAudioSrcAtom.set(src);

            watchBroadcast();
          }}
        />
      ))}
    </ButtonGroup.Root>
  );

  return (
    <>
      {topNode(buttons)}
      {!comAudio?.length ? (
        <div className="flex items-center justify-center w-full h-[30%]">В песне треков нет</div>
      ) : isNoMarks ? (
        <div className="flex items-center justify-center w-full h-[30%]">Слайды не настроены</div>
      ) : (
        <>
          {broadcastSrc && (
            <div className="mt-5 bg-x2 flex min-h-20 gap-3 px-3 mb-3">
              <CmComAudioPlayerPlayButton
                src={broadcastSrc}
                className="mx-5 scale-300!"
              />

              <CmComAudioPlayerTrack src={broadcastSrc} />
            </div>
          )}
          {com && broadcastSrc && (
            <div className="mb-10">
              <CmComAudioPlayerMarksMovers
                com={com}
                preSwitchTimeAtom={cmComTrackPreSwitchTimeAtom}
                src={broadcastSrc}
              />
            </div>
          )}

          <ScreenBroadcastControlPanel />
        </>
      )}
    </>
  );
};
