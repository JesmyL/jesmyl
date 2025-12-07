import { cmComChordVisibleVariantAtom } from '$cm/entities/com';
import { ChordVisibleVariant } from '$cm/shared/model';
import { useAtomValue } from 'atomaric';
import { toast } from 'sonner';
import { CmComTool } from '../ComTool';

export const CmComToolChordsVariant = () => {
  const chordVisibleVariant = useAtomValue(cmComChordVisibleVariantAtom);

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
        const newVariant =
          chordVisibleVariant === ChordVisibleVariant.Maximal
            ? ChordVisibleVariant.None
            : chordVisibleVariant === ChordVisibleVariant.None
              ? ChordVisibleVariant.Minimal
              : ChordVisibleVariant.Maximal;

        if (newVariant === ChordVisibleVariant.Maximal) toast('Максимальное количество аккордов');
        if (newVariant === ChordVisibleVariant.Minimal)
          toast('Текст с минимальным количеством аккордов', {
            action: {
              label: 'Подробнее',
              onClick: () => {
                toast(
                  'В режиме минимального количества аккордов они присутствуют в блоках, где впервые встречаются или меняются (для одноимённых)',
                  {
                    duration: 10000,
                    closeButton: true,
                  },
                );
              },
            },
          });
        if (newVariant === ChordVisibleVariant.None) toast('Текст без аккордов');

        cmComChordVisibleVariantAtom.set(newVariant);

        return true;
      }}
    />
  );
};
