import { ScreenBroadcastControlPanel } from '#features/broadcast/controls/ControllPanel';
import { BibleTranslateModulesControl } from '$bible/ext';
import { bibleVerseiAtom } from '$bible/shared/state/atoms';

export const BibleBroadcastControl = function TopPanel() {
  return (
    <>
      <BibleTranslateModulesControl />
      <ScreenBroadcastControlPanel onChange={bibleVerseiAtom.do.increment} />
    </>
  );
};
