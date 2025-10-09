import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheCom } from '$cm/col/com/TheCom';

export const CmEditorTabWatch = ({ ccom }: { ccom: EditableCom }) => {
  return (
    <TheCom
      com={ccom}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
    />
  );
};
