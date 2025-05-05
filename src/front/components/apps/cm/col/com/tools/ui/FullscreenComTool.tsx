import { isFullscreenAtom } from '#shared/lib/atoms/fullscreen';
import { useAtomSet } from 'atomaric';
import { ComTool } from '../ComTool';

export const FullscreenComTool = () => {
  const switchFullscreen = useAtomSet(isFullscreenAtom);

  return (
    <ComTool
      title="На весь экран"
      icon="ArrowExpand01"
      onClick={() => switchFullscreen(true)}
    />
  );
};
