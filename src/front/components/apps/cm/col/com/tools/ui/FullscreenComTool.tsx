import { useAtomSet } from '#shared/lib/atom';
import { isFullscreenAtom } from '#shared/lib/atoms/fullscreen';
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
