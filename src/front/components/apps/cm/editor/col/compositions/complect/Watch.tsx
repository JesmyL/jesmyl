import { ChordVisibleVariant } from '../../../../Cm.model';
import { TheCom } from '../../../../col/com/TheCom';
import { useEditableCcom } from '../useEditableCcom';

export function EditableCompositionWatch() {
  const ccom = useEditableCcom();

  if (!ccom) return null;

  return (
    <TheCom
      com={ccom}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
    />
  );
}
