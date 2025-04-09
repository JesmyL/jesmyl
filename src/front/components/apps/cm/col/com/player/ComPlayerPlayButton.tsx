import { useAtomValue } from '#shared/lib/atom';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { comPlayerIsPlayAtom, comPlayerPlaySrcAtom } from './controls';

interface Props {
  className?: string;
  src: string;
}

export const ComPlayerPlayButton = ({ src, className = '' }: Props) => {
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);

  return (
    <LazyIcon
      className={className + ' pointer ' + (playSrc && playSrc !== src ? 'text-x5' : '')}
      icon={useAtomValue(comPlayerIsPlayAtom) ? 'Pause' : 'Play'}
      onClick={() => {
        comPlayerPlaySrcAtom.set(src);
        comPlayerIsPlayAtom.toggle();
      }}
    />
  );
};
