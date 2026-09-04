import { translateBase } from '#basis/locale';
import { useBibleBroadcastArchiveListKeyListener } from '$bible/entities/BroadcastArchive';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { checkIsNil } from 'shared/utils/checkIs';
import { BibleBroadcastKeyListenScope } from '../model/broadcast';
import {
  bibleBroadcastCurrentListLengthAtom,
  bibleBroadcastCurrentSelectedIndexAtom,
  bibleBroadcastKeyListenScopeAtom,
} from '../state';
import { biblePlanCurrentItemiAtom } from '../state/atoms';
import { bibleIDB } from '../state/bibleIDB';

export const useBibleBroadcastArchiveKeyListener = (win: Window) => {
  const history = bibleIDB.useValue.broadcastHistory();
  const plan = bibleIDB.useValue.broadcastPlan();
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  const listLength =
    listenScope === BibleBroadcastKeyListenScope.History
      ? history?.length
      : listenScope === BibleBroadcastKeyListenScope.Plan
        ? plan?.length
        : null;

  useEffect(() => {
    if (checkIsNil(listLength)) return;
    bibleBroadcastCurrentListLengthAtom.set(() => listLength);
  }, [listLength]);

  useEffect(() => {
    if (plan) {
      //
    }
    biblePlanCurrentItemiAtom.reset();
  }, [plan]);

  useEffect(() => {
    if (listenScope !== BibleBroadcastKeyListenScope.Plan) return;
    bibleBroadcastCurrentSelectedIndexAtom.set(-1);
    setTimeout(() => bibleBroadcastCurrentSelectedIndexAtom.set(biblePlanCurrentItemiAtom.get()), 0);

    return bibleBroadcastCurrentSelectedIndexAtom.subscribe(index => {
      setTimeout(() => {
        if (bibleBroadcastKeyListenScopeAtom.get() !== BibleBroadcastKeyListenScope.Plan) return;
        biblePlanCurrentItemiAtom.set(index);
      }, 100);
    });
  }, [listenScope]);

  useBibleBroadcastArchiveListKeyListener(
    win,
    translateBase(it => it.history),
    BibleBroadcastKeyListenScope.History,
    history,
    itemi => bibleIDB.set.broadcastHistory(prev => (checkIsNil(itemi) ? [] : prev?.filter((_, iti) => iti !== itemi))),
  );

  useBibleBroadcastArchiveListKeyListener(
    win,
    translateBase(it => it.plan),
    BibleBroadcastKeyListenScope.Plan,
    plan,
    itemi => bibleIDB.set.broadcastPlan(prev => (checkIsNil(itemi) ? [] : prev?.filter((_, iti) => iti !== itemi))),
  );
};
