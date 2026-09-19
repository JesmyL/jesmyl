import { translateBase } from '#basis/locale';
import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';

export const CmShowChordedSlideModeSelector = () => {
  const showMode = useAtomValue(cmShowChordedSlideModeAtom);

  return (
    <>
      <Dropdown
        label={translateBase(it => it.cm.chBlocks)}
        id={showMode}
        onSelectId={cmShowChordedSlideModeAtom.set}
        items={[
          {
            id: CmBroadcastShowChordedSlideMode.Show,
            title: translateBase(it => it.cm.toShow),
          },
          {
            id: CmBroadcastShowChordedSlideMode.Pass,
            title: translateBase(it => it.cm.toPass),
          },
          {
            id: CmBroadcastShowChordedSlideMode.Hide,
            title: translateBase(it => it.cm.toHide),
          },
          {
            id: CmBroadcastShowChordedSlideMode.Blind,
            title: translateBase(it => it.cm.emptySlide),
          },
        ]}
      />
    </>
  );
};
