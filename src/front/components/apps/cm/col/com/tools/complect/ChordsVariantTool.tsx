import { useChordVisibleVariant } from '../../../../../../../07-basis/lib/hooks/cm/useChordVisibleVariant';
import { ChordVisibleVariant } from '../../../../Cm.model';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../useMigratableComTools';

export const ChordsVariantTool = () => {
  const ccom = useComToolsCcomContext();
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
