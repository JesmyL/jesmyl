import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'atomaric';
import { HttpNumLeadLink } from 'shared/api';
import { checkIsArray } from 'shared/utils/checkIs';
import { twMerge } from 'tailwind-merge';
import {
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
} from '../state/current-play-com';
import { CmComAudioPlayerPlayButton } from './ComPlayerPlayButton';
import { CmComAudioPlayerTrack } from './ComPlayerTrack';

interface Props {
  links: HttpNumLeadLink | HttpNumLeadLink[];
  timeRender?: (timeNode: React.ReactNode) => React.ReactNode;
  addRender?: (currentSrc: HttpNumLeadLink) => React.ReactNode;
  className?: string;
}

export const CmComAudioPlayer = ({ links, timeRender, addRender, className }: Props) => {
  const variants = checkIsArray(links) ? links : [links];
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isPlay = useAtomValue(cmComAudioPlayerIsPlayAtom);

  const activeVarianti = playSrc ? variants.indexOf(playSrc) : -1;
  const src = activeVarianti < 0 ? variants[0] : variants[activeVarianti];
  const linkLeadNum = parseInt(src, 10);

  const linkHostQuery = useQuery({
    queryKey: ['cmTsjrpcClient.getLinkLeadNumHost', linkLeadNum],
    queryFn: () => cmTsjrpcClient.getLinkLeadNumHost({ num: linkLeadNum }),
  });

  return (
    <div className={twMerge('w-full', className)}>
      <div className="composition-player flex items-center gap-2 px-2 w-full [--com-player-size:30px] [--com-player-height:var(--com-player-size)] h-(--com-player-height) overflow-hidden text-[0.8em] whitespace-nowrap bg-[linear-gradient(100deg,var(--color--2),var(--color--1))] shadow-[0_10px_22px_-16px_var(--color--3)] [transition:opacity_0.2s,margin_0.2s]">
        <CmComAudioPlayerPlayButton src={src} />
        <CmComAudioPlayerTrack
          src={src}
          timeRender={timeRender}
        />
        <div className="absolute pointers-none text-center w-full text-[.5rem] top-[2.2em]">
          {linkHostQuery.data?.host}
        </div>

        {variants.length > 1 && (
          <div className="ml-auto pr-px flex justify-center gap-1 pointer">
            {variants.map((variant, varianti) => (
              <button
                key={variant}
                className={twMerge(
                  'flex items-center justify-center min-w-[1.4em] h-[1.4em] px-[0.2em] border-0 rounded-[0.45em] text-[0.75em] text-[var(--color--2)] bg-[var(--color--3)] opacity-45 [transition:transform_0.18s,opacity_0.18s,background_0.18s] hover:-translate-y-px hover:opacity-80',
                  varianti === activeVarianti &&
                    'opacity-100 text-[var(--color--5)] bg-[var(--color--7)] scale-[1.08] shadow-[0_4px_10px_-4px_var(--color--7)]',
                )}
                onClick={() => {
                  cmComAudioPlayerSetSrc(variant);
                  if (isPlay) cmComAudioPlayerSwitchIsPlay(true);
                }}
              >
                {varianti + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      {addRender && <div className="relative top-2 flex gap-3 max-w-[100vw]">{addRender(src)}</div>}
    </div>
  );
};

const playingPulse = keyframes`
  0%,
  100% {
    box-shadow:
      0 14px 30px -10px var(--color--7),
      0 0 0 0 color-mix(in srgb, var(--color--7) 55%, transparent);
  }

  50% {
    box-shadow:
      0 14px 30px -10px var(--color--7),
      0 0 0 12px color-mix(in srgb, var(--color--7) 0%, transparent);
  }
`;

export const StyledCmComAudioPlayerPlayButton = styled(CmComAudioPlayerPlayButton)<{ $isPlaying: boolean }>`
  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      animation: ${playingPulse} 2s ease-in-out infinite;
    `}
`;
