import { translateBase } from '#basis/locale';
import { cmComSelectedComwsAtom, useCmComCurrent } from '$cm/entities/com';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

export const CmComToolSelected = () => {
  const ccom = useCmComCurrent();
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);

  if (ccom == null) return <CmComTool icon="CheckmarkBadge01" />;
  const comNum = selectedComws.indexOf(ccom.wid) + 1;

  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.SelectedToggle], { v: comNum })}
      icon="CheckmarkBadge01"
      iconKind={comNum ? 'SolidRounded' : undefined}
      onClick={() => cmComSelectedComwsAtom.do.toggle(ccom.wid)}
    />
  );
};
