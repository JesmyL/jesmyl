import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { comPlayerIsPlayAtom, comPlayerPlaySrcAtom } from '$cm/basis/lib/control/current-play-com';
import { useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';

interface Props {
  className?: string;
  src: HttpLink;
  isPlayOwnOnly?: boolean;
}

export const ComPlayerPlayButton = ({ src, className = '', isPlayOwnOnly }: Props) => {
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);
  const isOtherPlaySrc = playSrc && playSrc !== src;
  const isCurrentPlay = useAtomValue(comPlayerIsPlayAtom);
  const isPlay = isPlayOwnOnly && isOtherPlaySrc ? false : isCurrentPlay;

  return (
    <LazyIcon
      icon={isPlay ? 'Pause' : 'Play'}
      className={className + ' pointer ' + (!isPlayOwnOnly && isOtherPlaySrc ? 'text-x5' : '')}
      withoutAnimation
      onClick={() => {
        comPlayerPlaySrcAtom.set(src);
        comPlayerIsPlayAtom.do.toggle();
      }}
    />
  );
};
