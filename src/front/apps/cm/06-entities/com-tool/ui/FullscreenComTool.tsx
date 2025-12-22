import { isFullscreenAtom } from '#shared/lib/atoms/fullscreen';
import { CmComTool } from '../ComTool';

export const CmComToolFullscreen = () => {
  return (
    <CmComTool
      title="На весь экран"
      icon="ArrowExpand01"
      onClick={() => isFullscreenAtom.set(true)}
    />
  );
};
