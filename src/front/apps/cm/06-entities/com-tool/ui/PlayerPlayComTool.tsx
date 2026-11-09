import { translateBase } from '#basis/locale';
import { DisabledArea } from '#shared/ui/DisabledArea';
import { useCmComCurrent } from '$cm/entities/com';
import {
  cmComAudioPlayerIsFromPlayerPageAtom,
  cmComAudioPlayerMarkManualPick,
  cmComAudioPlayerSetCurrentComw,
} from '$cm/entities/com-audio-player';
import { useNavigate } from '@tanstack/react-router';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

/**
 * Opens the player on the current com right away; the player page resolves the cached track itself and starts playback.
 * The session is marked as a player-page one, so the ended track walks on to the next com of the list instead of stopping.
 */
export const CmComToolPlayerPlay = () => {
  const ccom = useCmComCurrent();
  const navigate = useNavigate();
  const audio = ccom?.audio;

  return (
    <DisabledArea
      disabled={!audio?.length}
      disabledReason={translateBase(BaseLocaleKey.CmNoComTracks)}
      onClick={() => {
        if (!ccom || !audio?.length) return;

        cmComAudioPlayerMarkManualPick();
        cmComAudioPlayerIsFromPlayerPageAtom.set(true);
        cmComAudioPlayerSetCurrentComw(ccom.wid);

        return navigate({ to: '/cm/player', search: { comw: ccom.wid } });
      }}
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
