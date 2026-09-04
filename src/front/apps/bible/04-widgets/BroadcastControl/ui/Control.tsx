import { ScreenBroadcastControlPanel } from '#features/broadcast/controls/ControllPanel';
import { BibleTranslateModulesControl } from '$bible/ext';
import { bibleVerseiAtom } from '$bible/shared/state/atoms';

export const BibleBroadcastControl = function TopPanel() {
  return (
    <>
      <div
        className="mx-3"
        title="Ctrl+@ - добавить/убрать перевод на экран"
      >
        <BibleTranslateModulesControl />
      </div>
      <ScreenBroadcastControlPanel onChange={bibleVerseiAtom.do.increment} />
    </>
  );
};
