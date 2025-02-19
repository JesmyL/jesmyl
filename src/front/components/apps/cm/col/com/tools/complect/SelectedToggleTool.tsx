import { useSelectedComs } from 'front/components/apps/cm/base/useSelectedComs';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../useMigratableComTools';

export const SelectedToggleTool = () => {
  const ccom = useComToolsCcomContext();
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
