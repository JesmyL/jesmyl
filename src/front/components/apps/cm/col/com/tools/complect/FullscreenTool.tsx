import { useFullScreen } from '../../../../../../../shared/lib/+hooks/useFullscreen';
import { ComTool } from '../ComTool';

export const FullscreenTool = () => {
  const [, switchFullscreen] = useFullScreen();

  return (
    <ComTool
      title="На весь экран"
      icon="ArrowExpand01"
      onClick={() => switchFullscreen(true)}
    />
  );
};
