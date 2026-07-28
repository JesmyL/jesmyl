import { translateBase } from '#basis/locale';
import { isFullscreenAtom } from '#shared/lib/atoms/fullscreen';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolFullscreen = () => {
  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.FullscreenMode])}
      icon="ArrowExpand01"
      onClick={() => isFullscreenAtom.set(true)}
    />
  );
};
