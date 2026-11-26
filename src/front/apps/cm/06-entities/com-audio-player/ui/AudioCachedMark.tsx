import { translateBase } from '#basis/locale';
import { useConfirm } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmAudioSrc } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import { CmComAudioPlayerSrcState } from '../model';
import {
  cmComAudioPlayerCacheSrc,
  cmComAudioPlayerUncacheSrc,
  cmComAudioPlayerCacheToast,
  cmComAudioPlayerCachedSrcsAtom,
  cmComAudioPlayerCachedSrcsLoadedAtom,
  cmComAudioPlayerSrcStatesAtom,
} from '../lib/audioCache';

interface ButtonProps {
  src: CmAudioSrc;
  comName: string;
  className?: string;
}

/**
 * Three-state cloud button for a single track: outlined downloads, solid is cached, red retries after a failure.
 */
export const CmComAudioPlayerCacheButton = ({ src, comName, className }: ButtonProps) => {
  const cachedSrcs = useAtomValue(cmComAudioPlayerCachedSrcsAtom);
  const states = useAtomValue(cmComAudioPlayerSrcStatesAtom);
  const cachedSrcsLoaded = useAtomValue(cmComAudioPlayerCachedSrcsLoadedAtom);
  const confirm = useConfirm();
  const [isLoading, setIsLoading] = useState(false);

  const isCached = cachedSrcs.has(src);
  const isError = states[src] === CmComAudioPlayerSrcState.Error;

  return (
    <TheIconLoading
      isLoading={isLoading}
      icon="CloudDownload"
      iconKind={isCached ? 'SolidRounded' : undefined}
      className={twMerge('pointer', !cachedSrcsLoaded && 'opacity-60', isError && 'text-xKO', className)}
      onClick={async event => {
        event.stopPropagation();
        if (isLoading) return;

        setIsLoading(true);
        try {
          if (!isCached) {
            if (await cmComAudioPlayerCacheSrc(src).catch(emptyFunc)) await cmComAudioPlayerCacheToast([src], comName);
          } else if (await confirm(translateBase(BaseLocaleKey.CmCacheDeleteDescription))) {
            await cmComAudioPlayerUncacheSrc(src, comName);
          }
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
};

interface MarksProps {
  srcs: CmAudioSrc[] | nil;
  comName: string;
  className?: string;
}

/** A cloud per track in order; renders nothing for coms without audio. */
export const CmComAudioPlayerCacheMarks = ({ srcs, comName, className }: MarksProps) => {
  if (!srcs?.length) return null;

  return (
    <span className={twMerge('flex gap-1', className)}>
      {srcs.map(src => (
        <CmComAudioPlayerCacheButton
          key={src}
          src={src}
          comName={comName}
        />
      ))}
    </span>
  );
};
