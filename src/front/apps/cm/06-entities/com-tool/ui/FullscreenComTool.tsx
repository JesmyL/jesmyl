import { translateBase } from '#basis/locale';
import { switchFullScreen } from '#shared/lib/atoms/fullscreen';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

export const CmComToolFullscreen = () => {
  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.FullscreenMode])}
      icon="ArrowExpand01"
      onClick={() => switchFullScreen(true)}
    />
  );
};
