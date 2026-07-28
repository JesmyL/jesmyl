import { translateBase } from '#basis/locale';
import { cmComSelectedComwsAtom, useCmComCurrent, useCmComSelectedList } from '$cm/entities/com';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolSelected = () => {
  const ccom = useCmComCurrent();
  const { selectedComPosition } = useCmComSelectedList();

  if (ccom == null) return <CmComTool icon="CheckmarkBadge01" />;

  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.SelectedToggle], { v: +selectedComPosition(ccom.wid) })}
      icon="CheckmarkBadge01"
      iconKind={selectedComPosition(ccom.wid) ? 'SolidRounded' : undefined}
      onClick={() => cmComSelectedComwsAtom.do.toggle(ccom.wid)}
    />
  );
};
