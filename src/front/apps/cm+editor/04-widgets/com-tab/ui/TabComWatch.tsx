import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { TheCmCom } from '$cm/ext';

export const CmEditorComTabWatch = ({ ccom }: { ccom: EditableCom }) => {
  return (
    <TheCmCom
      com={ccom}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
    />
  );
};
