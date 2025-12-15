import { cmComSelectedComwsAtom, useCmComCurrent, useCmComSelectedList } from '$cm/entities/com';
import { CmComTool } from '../ComTool';

export const CmComToolSelected = () => {
  const ccom = useCmComCurrent();
  const { selectedComPosition } = useCmComSelectedList();

  return (
    ccom && (
      <CmComTool
        title={selectedComPosition(ccom.wid) ? 'Убрать из выбранных' : 'Выбрать песню'}
        icon="CheckmarkBadge01"
        iconKind={selectedComPosition(ccom.wid) ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => cmComSelectedComwsAtom.do.toggle(ccom.wid)}
      />
    )
  );
};
