import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { ChordVisibleVariant, TheCmCom } from '$cm/ext';

export const CmEditorComTabWatch = ({ ccom }: { ccom: EditableCom }) => {
  return (
    <TheCmCom
      com={ccom}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
    />
  );
};
