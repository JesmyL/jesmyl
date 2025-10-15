import { useCmComChordVisibleVariant } from '$cm/entities/com';
import { ChordVisibleVariant } from '$cm/shared/model';
import { CmComTool } from '../ComTool';

export const CmComToolChordsVariant = () => {
  const [chordVisibleVariant, setChordVisibleVariant] = useCmComChordVisibleVariant();

  return (
    <CmComTool
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
