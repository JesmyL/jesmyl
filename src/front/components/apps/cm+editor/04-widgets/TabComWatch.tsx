import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheCom } from '$cm/col/com/TheCom';

export const CmEditorTabWatch = () => {
  const ccom = useEditableCcom();

  if (!ccom) return null;

  return (
    <TheCom
      com={ccom}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
    />
  );
};
