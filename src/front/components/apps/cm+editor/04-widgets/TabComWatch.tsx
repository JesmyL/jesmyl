import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { TheCmCom } from 'front/apps/cm/04-widgets/com/ui/TheCom';
import { ChordVisibleVariant } from 'front/apps/cm/07-shared/model/Cm.model';

export const CmEditorTabWatch = ({ ccom }: { ccom: EditableCom }) => {
  return (
    <TheCmCom
      com={ccom}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
    />
  );
};
