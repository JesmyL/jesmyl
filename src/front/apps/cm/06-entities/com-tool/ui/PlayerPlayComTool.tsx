import { translateBase } from '#basis/locale';
import { DisabledArea } from '#shared/ui/DisabledArea';
import { useCmComCurrent } from '$cm/entities/com';
import {
  cmComAudioPlayerIsFromPlayerPageAtom,
  cmComAudioPlayerMarkManualPick,
  cmComAudioPlayerSetCurrentComw,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
  takeCmComAudioPlayerCachedSrcs,
} from '$cm/entities/com-audio-player';
import { useNavigate } from '@tanstack/react-router';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

/**
 * Opens the player on the current com, preferring a track already cached for offline playback.
 * The entry starts playback right away and marks the session as player-page one, so the ended
 * track walks on to the next com of the list instead of stopping.
 */
export const CmComToolPlayerPlay = () => {
  const ccom = useCmComCurrent();
  const navigate = useNavigate();
  const audio = ccom?.audio;

  return (
    <DisabledArea
      disabled={!audio?.length}
      disabledReason={translateBase(BaseLocaleKey.CmNoComTracks)}
      onClick={() =>
        void takeCmComAudioPlayerCachedSrcs().then(cachedSrcs => {
          const coml = audio?.find(src => cachedSrcs.has(src)) ?? audio?.[0];
          if (!ccom || !coml) return;

          cmComAudioPlayerMarkManualPick();
          cmComAudioPlayerIsFromPlayerPageAtom.set(true);
          cmComAudioPlayerSetCurrentComw(ccom.wid);
          cmComAudioPlayerSetSrc(coml);
          cmComAudioPlayerSwitchIsPlay(true);

          return navigate({ to: '/cm/player', search: { comw: ccom.wid, coml } });
        })
      }
    >
      {({ className, onClick }) => (
        <CmComTool
          title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.PlayerPlay])}
          icon="Play"
          className={className}
          onClick={onClick}
        />
      )}
    </DisabledArea>
  );
};
