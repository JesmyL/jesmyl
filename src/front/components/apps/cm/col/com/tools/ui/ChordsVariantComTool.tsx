import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { ComTool } from '../ComTool';

export const ChordsVariantComTool = () => {
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
            : chordVisibleVariant === ChordVisibleVariant.None
              ? ChordVisibleVariant.Minimal
              : ChordVisibleVariant.Maximal,
        );

        return true;
      }}
    />
  );
};
