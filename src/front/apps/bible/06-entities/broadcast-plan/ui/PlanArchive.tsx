import { translateBase } from '#basis/locale';
import { BibleBroadcastArchive } from '$bible/entities/BroadcastArchive';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastCurrentSelectedIndexAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { useAtomValue } from 'atomaric';
import { memo, useEffect } from 'react';
import { checkIsNil } from 'shared/utils/checkIs';

let prevIndex = 0;

export const BibleBroadcastPlanArchive = memo(function BibleBroadcastPlanArchive() {
  const plan = bibleIDB.useValue.broadcastPlan();
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  useEffect(() => {
    if (listenScope !== BibleBroadcastKeyListenScope.Plan) return;
    bibleBroadcastCurrentSelectedIndexAtom.set(-1);
    setTimeout(() => bibleBroadcastCurrentSelectedIndexAtom.set(prevIndex), 0);

    return bibleBroadcastCurrentSelectedIndexAtom.subscribe(index => {
      setTimeout(() => {
        if (bibleBroadcastKeyListenScopeAtom.get() !== BibleBroadcastKeyListenScope.Plan) return;
        prevIndex = index;
      }, 100);
    });
  }, [listenScope]);

  return (
    <BibleBroadcastArchive
      title={translateBase(it => it.plan)}
      list={plan}
      onRemove={itemi =>
        bibleIDB.set.broadcastPlan(prev => (checkIsNil(itemi) ? [] : prev?.filter((_, iti) => iti !== itemi)))
      }
      scope={BibleBroadcastKeyListenScope.Plan}
    />
  );
});
