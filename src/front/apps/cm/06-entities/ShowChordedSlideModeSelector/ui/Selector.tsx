import { translateBase } from '#basis/locale';
import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmShowChordedSlideModeSelector = () => {
  const showMode = useAtomValue(cmShowChordedSlideModeAtom);

  return (
    <>
      <Dropdown
        label={translateBase(BaseLocaleKey.CmChordBlocks)}
        id={showMode}
        onSelectId={cmShowChordedSlideModeAtom.set}
        items={[
          {
            id: CmBroadcastShowChordedSlideMode.Show,
            title: translateBase(BaseLocaleKey.CmToShow),
          },
          {
            id: CmBroadcastShowChordedSlideMode.Pass,
            title: translateBase(BaseLocaleKey.CmToPass),
          },
          {
            id: CmBroadcastShowChordedSlideMode.Hide,
            title: translateBase(BaseLocaleKey.CmToHide),
          },
          {
            id: CmBroadcastShowChordedSlideMode.Blind,
            title: translateBase(BaseLocaleKey.CmEmptySlide),
          },
        ]}
      />
    </>
  );
};
