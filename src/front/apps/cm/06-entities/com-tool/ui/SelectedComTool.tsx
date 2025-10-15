import { useCmComCurrent, useCmComSelectedList } from '$cm/entities/com';
import { CmComTool } from '../ComTool';

export const CmComToolSelected = () => {
  const ccom = useCmComCurrent();
  const { toggleSelectedCom, selectedComPosition: isSelected } = useCmComSelectedList();

  return (
    ccom && (
      <CmComTool
        title={isSelected(ccom.wid) ? 'Убрать из выбранных' : 'Выбрать песню'}
        icon="CheckmarkCircle02"
        iconKind={isSelected(ccom.wid) ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => toggleSelectedCom(ccom.wid)}
      />
    )
  );
};
