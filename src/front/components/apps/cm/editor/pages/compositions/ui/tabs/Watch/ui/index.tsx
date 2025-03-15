import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheCom } from '$cm/col/com/TheCom';
import { useEditableCcom } from '$cm/editor/pages/compositions/lib/useEditableCom';

export const CmEditableCompositionWatchTab = () => {
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
