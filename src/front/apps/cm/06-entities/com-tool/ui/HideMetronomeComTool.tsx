import { translateBase } from '#basis/locale';
import { metronomeIsOpenAtom } from '#widgets/metronome';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

export const CmComToolHideMetronome = () => {
  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.HideMetronome])}
      icon="DashboardSpeed01"
      onClick={() => metronomeIsOpenAtom.set(true)}
    />
  );
};
