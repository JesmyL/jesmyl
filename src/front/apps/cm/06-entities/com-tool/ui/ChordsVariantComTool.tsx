import { translateBase } from '#basis/locale';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComChordVisibleVariantAtom } from '$cm/entities/com';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { toast } from 'sonner';
import { CmComTool } from '../ComTool';

export const CmComToolChordsVariant = () => {
  const chordVisibleVariant = useAtomValue(cmComChordVisibleVariantAtom);

  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.ChordsVariant])}
      icon={
        chordVisibleVariant === ChordVisibleVariant.Maximal
          ? 'ApproximatelyEqualSquare'
          : chordVisibleVariant === ChordVisibleVariant.Minimal
            ? 'CongruentToSquare'
            : 'EqualSignSquare'
      }
      onClick={() => {
        const newVariant =
          chordVisibleVariant === ChordVisibleVariant.Maximal
            ? ChordVisibleVariant.None
            : chordVisibleVariant === ChordVisibleVariant.None
              ? ChordVisibleVariant.Minimal
              : ChordVisibleVariant.Maximal;

        if (newVariant === ChordVisibleVariant.Maximal) toast(translateBase(BaseLocaleKey.CmMaximumChordsCount));
        if (newVariant === ChordVisibleVariant.Minimal)
          toast(
            translateBase(BaseLocaleKey.CmMinimumChordsCount),
            {
              action: {
                label: translateBase(BaseLocaleKey.Detailed),
                onClick: () => {
                  toast(
                    translateBase(BaseLocaleKey.CmMinimumChordsCountDescription),
                    {
                      duration: 10000,
                      closeButton: true,
                    },
                  );
                },
              },
            },
          );
        if (newVariant === ChordVisibleVariant.None) toast(translateBase(BaseLocaleKey.CmNoChordsText));

        cmComChordVisibleVariantAtom.set(newVariant);

        return true;
      }}
    />
  );
};
