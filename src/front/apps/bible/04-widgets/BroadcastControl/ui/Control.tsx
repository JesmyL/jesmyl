import { translateBase } from '#basis/locale';
import { ScreenBroadcastControlPanel } from '#features/broadcast/controls/ControllPanel';
import { BibleTranslateModulesControl } from '$bible/ext';
import { bibleVerseiAtom } from '$bible/shared/state/atoms';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const BibleBroadcastControl = function TopPanel() {
  return (
    <>
      <div
        className="mx-3"
        title={translateBase(BaseLocaleKey.BibleAddTranslationToScreen)}
      >
        <BibleTranslateModulesControl />
      </div>
      <ScreenBroadcastControlPanel onChange={bibleVerseiAtom.do.increment} />
    </>
  );
};
