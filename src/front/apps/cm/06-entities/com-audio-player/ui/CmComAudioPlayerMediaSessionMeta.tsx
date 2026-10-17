import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import {
  cmComAudioPlayerMediaTitleAtom,
  cmComAudioPlayerPlaySrcAtom,
} from '../state/current-play-com';

const mediaSession = navigator.mediaSession;

/**
 * Single owner of the Media Session metadata: derives the title from the current track, with
 * caller props (when passed) taking precedence. With no track playing there is no metadata.
 */
export const CmComAudioPlayerMediaSessionMeta = ({ album, artist, artwork, title }: Partial<MediaMetadataInit>) => {
  const mediaTitle = useAtomValue(cmComAudioPlayerMediaTitleAtom);
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);

  useEffect(() => {
    if (!mediaSession) return;

    if (playSrc == null) {
      mediaSession.metadata = null;
      return;
    }

    mediaSession.metadata = new MediaMetadata({
      album,
      artist: artist ?? 'JesmyL',
      artwork,
      title: title ?? mediaTitle ?? 'JesmyL',
    });
  }, [album, artist, artwork, title, mediaTitle, playSrc]);

  useEffect(
    () => () => {
      if (mediaSession) mediaSession.metadata = null;
    },
    [],
  );

  return null;
};
