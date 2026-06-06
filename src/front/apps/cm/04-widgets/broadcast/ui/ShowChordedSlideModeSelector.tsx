import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';

export const CmBroadcastShowChordedSlideModeSelector = () => {
  const showMode = useAtomValue(cmShowChordedSlideModeAtom);

  return (
    <>
      <Dropdown
        label="Аккордные блоки"
        id={showMode}
        onSelectId={cmShowChordedSlideModeAtom.set}
        items={[
          {
            id: CmBroadcastShowChordedSlideMode.Show,
            title: 'Показывать',
          },
          {
            id: CmBroadcastShowChordedSlideMode.Pass,
            title: 'Пропускать',
          },
          {
            id: CmBroadcastShowChordedSlideMode.Hide,
            title: 'Скрывать',
          },
          {
            id: CmBroadcastShowChordedSlideMode.Blind,
            title: 'Пустой слайд',
          },
        ]}
      />
    </>
  );
};
