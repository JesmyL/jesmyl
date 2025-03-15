import { useFullScreen } from '#shared/lib/hooks/useFullscreen';
import { ComTool } from '../ComTool';

export const FullscreenComTool = () => {
  const [, switchFullscreen] = useFullScreen();

  return (
    <ComTool
      title="На весь экран"
      icon="ArrowExpand01"
      onClick={() => switchFullscreen(true)}
    />
  );
};
