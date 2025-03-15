import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { useCcom } from '$cm/basis/lib/com-selections';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { ComTool } from '../ComTool';

export const ChordsVariantComTool = () => {
  const ccom = useCcom();
  const [chordVisibleVariant, setChordVisibleVariant] = useChordVisibleVariant();

  return (
    <ComTool
      title="Показать аккорды"
      icon={
        chordVisibleVariant === ChordVisibleVariant.Maximal
          ? 'ApproximatelyEqualSquare'
          : chordVisibleVariant === ChordVisibleVariant.Minimal
            ? 'CongruentToSquare'
            : 'EqualSignSquare'
      }
      onClick={() => {
        setChordVisibleVariant(
          chordVisibleVariant === ChordVisibleVariant.Maximal
            ? ChordVisibleVariant.None
            : !ccom?.orders?.some(ord => !ord.isMin && ord.texti != null)
              ? chordVisibleVariant === ChordVisibleVariant.None
                ? ChordVisibleVariant.Minimal
                : ChordVisibleVariant.None
              : chordVisibleVariant === ChordVisibleVariant.None
                ? ChordVisibleVariant.Minimal
                : ChordVisibleVariant.Maximal,
        );

        return true;
      }}
    />
  );
};
