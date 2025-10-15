import { isFullscreenAtom } from '#shared/lib/atoms/fullscreen';
import { useAtomSet } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolFullscreen = () => {
  const switchFullscreen = useAtomSet(isFullscreenAtom);

  return (
    <CmComTool
      title="На весь экран"
      icon="ArrowExpand01"
      onClick={() => switchFullscreen(true)}
    />
  );
};
