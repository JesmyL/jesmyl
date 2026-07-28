import { translateBase } from '#basis/locale';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComChordVisibleVariantAtom } from '$cm/entities/com';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { toast } from 'sonner';
import { CmComTool } from '../ComTool';

export const CmComToolChordsVariant = () => {
  const chordVisibleVariant = useAtomValue(cmComChordVisibleVariantAtom);

  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.ChordsVariant])}
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

        if (newVariant === ChordVisibleVariant.Maximal) toast(translateBase(it => it.cm.maxChCount));
        if (newVariant === ChordVisibleVariant.Minimal)
          toast(
            translateBase(it => it.cm.minChCount),
            {
              action: {
                label: translateBase(it => it.detailed),
                onClick: () => {
                  toast(
                    translateBase(it => it.cm.minChCountDsc),
                    {
                      duration: 10000,
                      closeButton: true,
                    },
                  );
                },
              },
            },
          );
        if (newVariant === ChordVisibleVariant.None) toast(translateBase(it => it.cm.noChTxt));

        cmComChordVisibleVariantAtom.set(newVariant);

        return true;
      }}
    />
  );
};
