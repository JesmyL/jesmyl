import { translateBase } from '#basis/locale';
import { metronomeIsOpenAtom } from '#widgets/metronome';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolHideMetronome = () => {
  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.HideMetronome])}
      icon="DashboardSpeed01"
      onClick={() => metronomeIsOpenAtom.set(true)}
    />
  );
};
