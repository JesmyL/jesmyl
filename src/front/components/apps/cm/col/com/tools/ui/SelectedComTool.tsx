import { useSelectedComs } from '$cm/base/useSelectedComs';
import { useCcom } from '$cm/basis/lib/com-selections';
import { ComTool } from '../ComTool';

export const SelectedComTool = () => {
  const ccom = useCcom();
  const { toggleSelectedCom, selectedComPosition: isSelected } = useSelectedComs();

  return (
    ccom && (
      <ComTool
        title={isSelected(ccom.wid) ? 'Убрать из выбранных' : 'Выбрать песню'}
        icon="CheckmarkCircle02"
        iconKind={isSelected(ccom.wid) ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => toggleSelectedCom(ccom.wid)}
      />
    )
  );
};
