import { cmComSelectedComwsAtom, useCmComCurrent, useCmComSelectedList } from '$cm/entities/com';
import { CmComTool } from '../ComTool';

export const CmComToolSelected = () => {
  const ccom = useCmComCurrent();
  const { selectedComPosition } = useCmComSelectedList();
  const selTitle = 'Выбрать песню';

  if (ccom == null)
    return (
      <CmComTool
        title={selTitle}
        icon="CheckmarkBadge01"
      />
    );

  return (
    <CmComTool
      title={selectedComPosition(ccom.wid) ? 'Убрать из выбранных' : selTitle}
      icon="CheckmarkBadge01"
      iconKind={selectedComPosition(ccom.wid) ? 'SolidRounded' : undefined}
      onClick={() => cmComSelectedComwsAtom.do.toggle(ccom.wid)}
    />
  );
};
