import { translateBase } from '#basis/locale';
import { useConfirm } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { HttpNumLeadLink } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  cmComAudioPlayerCacheSrc,
  cmComAudioPlayerUncacheSrc,
  useCmComAudioPlayerSrcState,
} from '../lib/audioCache';

interface ButtonProps {
  src: HttpNumLeadLink;
  className?: string;
}

/**
 * Three-state cloud button for a single track: outlined downloads, solid is cached, red retries after a failure.
 */
export const CmComAudioPlayerCacheButton = ({ src, className }: ButtonProps) => {
  const state = useCmComAudioPlayerSrcState(src);
  const confirm = useConfirm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TheIconLoading
      isLoading={isLoading}
      icon="CloudDownload"
      iconKind={state === 'cached' ? 'SolidRounded' : undefined}
      className={twMerge('pointer', state === 'error' && 'text-xKO', className)}
      onClick={async event => {
        event.stopPropagation();
        if (isLoading) return;

        setIsLoading(true);
        try {
          if (state !== 'cached') {
            await cmComAudioPlayerCacheSrc(src).catch(emptyFunc);
          } else if (await confirm(translateBase(it => it.cm.cacheTrackDelDsc))) {
            await cmComAudioPlayerUncacheSrc(src);
          }
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
};

interface MarksProps {
  srcs: HttpNumLeadLink[] | nil;
  className?: string;
}

/** A cloud per track in order; renders nothing for coms without audio. */
export const CmComAudioPlayerCacheMarks = ({ srcs, className }: MarksProps) => {
  if (!srcs?.length) return null;

  return (
    <span className={twMerge('flex gap-1', className)}>
      {srcs.map(src => (
        <CmComAudioPlayerCacheButton
          key={src}
          src={src}
        />
      ))}
    </span>
  );
};
