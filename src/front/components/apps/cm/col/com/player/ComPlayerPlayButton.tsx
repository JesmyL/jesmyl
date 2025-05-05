import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { comPlayerIsPlayAtom, comPlayerPlaySrcAtom } from './controls';

interface Props {
  className?: string;
  src: string;
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
        comPlayerIsPlayAtom.toggle();
      }}
    />
  );
};
