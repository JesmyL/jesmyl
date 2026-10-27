import { translateBase } from '#basis/locale';
import { useConfirm } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
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
  useCmComAudioPlayerSrcState,
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
  const state = useCmComAudioPlayerSrcState(src);
  const confirm = useConfirm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TheIconLoading
      isLoading={isLoading}
      icon="CloudDownload"
      iconKind={state === CmComAudioPlayerSrcState.Cached ? 'SolidRounded' : undefined}
      className={twMerge('pointer', state === CmComAudioPlayerSrcState.Error && 'text-xKO', className)}
      onClick={async event => {
        event.stopPropagation();
        if (isLoading) return;

        setIsLoading(true);
        try {
          if (state !== CmComAudioPlayerSrcState.Cached) {
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
