import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { comPlayerIsPlayAtom, comPlayerPlaySrcAtom } from '$cm/basis/lib/control/current-play-com';
import { useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  src: HttpLink;
}

export const ComPlayerPlayButton = ({ src, className }: Props) => {
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);
  const isOtherPlaySrc = playSrc && playSrc !== src;
  const isCurrentPlay = useAtomValue(comPlayerIsPlayAtom);
  const isPlay = isOtherPlaySrc ? false : isCurrentPlay;

  return (
    <LazyIcon
      icon={isPlay ? 'Pause' : 'Play'}
      className={twMerge('pointer', isOtherPlaySrc && 'text-x5', className)}
      withoutAnimation
      onClick={() => {
        comPlayerPlaySrcAtom.set(src);
        comPlayerIsPlayAtom.do.toggle();
      }}
    />
  );
};
