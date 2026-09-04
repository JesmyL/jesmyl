import { useBroadcastListeners } from '#features/broadcast/complect/config-line/hooks/listeners';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useEffect } from 'react';
import { extractNumber } from 'shared/utils';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import { bibleBroadcastSearchAreaConfigDict } from '../const';
import { BibleBroadcastTabId } from '../model/broadcast';
import { BibleBroadcastKeyListenScope } from '../model/broadcast/listeners';
import {
  bibleBroadcastGridActiveTabiAtom,
  bibleBroadcastGridTabsAtom,
  bibleBroadcastKeyListenSameScopeAtom,
  bibleBroadcastKeyListenScopeAtom,
} from '../state';
import { bibleBroadcastCurrentListLengthAtom, bibleBroadcastCurrentSelectedIndexAtom } from '../state/broadcast/atoms';
import { useBibleBroadcastAddressKeyListener } from './useBibleBroadcastAddressKeyListener';
import { useBibleBroadcastArchiveKeyListener } from './useBibleBroadcastArchiveKeyListener';

const indexSelectableScopeSet = new Set<number>([
  ...objectKeys(bibleBroadcastSearchAreaConfigDict).map(extractNumber),
  BibleBroadcastKeyListenScope.History,
  BibleBroadcastKeyListenScope.Plan,
]);

export const useBibleBroadcastKeyListener = (win: Window, configi: number) => {
  useBroadcastListeners(win, configi);
  useBibleBroadcastArchiveKeyListener(win);
  useBibleBroadcastAddressKeyListener(win);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', event => {
          const currentListenScope = bibleBroadcastKeyListenScopeAtom.get();
          let nextListenScope: BibleBroadcastKeyListenScope | nil;
          let isPreventDefault = true;
          let focusTab: BibleBroadcastTabId | nil;

          switch (event.code) {
            case 'F1':
              [nextListenScope, focusTab] =
                currentListenScope === BibleBroadcastKeyListenScope.Plan
                  ? [BibleBroadcastKeyListenScope.History, BibleBroadcastTabId.History]
                  : [BibleBroadcastKeyListenScope.Plan, BibleBroadcastTabId.Plan];

              bibleBroadcastCurrentSelectedIndexAtom.reset();
              break;
            case 'F2':
              nextListenScope = BibleBroadcastKeyListenScope.SearchInText;
              break;
            case 'F3':
              nextListenScope = BibleBroadcastKeyListenScope.SearchInChapter;
              break;
            case 'F4':
              nextListenScope = BibleBroadcastKeyListenScope.SearchByAddress;
              break;
            case 'ArrowUp':
              if (event.ctrlKey) {
                bibleBroadcastCurrentSelectedIndexAtom.set(0);
              } else if (
                indexSelectableScopeSet.has(currentListenScope) &&
                bibleBroadcastCurrentSelectedIndexAtom.get() > 0
              )
                bibleBroadcastCurrentSelectedIndexAtom.do.increment(-1);
              break;
            case 'ArrowDown':
              if (event.ctrlKey) {
                bibleBroadcastCurrentSelectedIndexAtom.set(bibleBroadcastCurrentListLengthAtom.get() - 1);
              } else if (indexSelectableScopeSet.has(currentListenScope))
                bibleBroadcastCurrentSelectedIndexAtom.do.increment();
              break;

            default:
              isPreventDefault = false;
          }

          if (currentListenScope === nextListenScope) bibleBroadcastKeyListenSameScopeAtom.do.increment();

          if (indexSelectableScopeSet.has(currentListenScope)) {
            event.stopPropagation();
          }

          if (nextListenScope) {
            if (
              indexSelectableScopeSet.has(nextListenScope) ||
              nextListenScope === BibleBroadcastKeyListenScope.AAAddressNav
            ) {
              bibleBroadcastCurrentSelectedIndexAtom.reset();
            }

            if (nextListenScope in bibleBroadcastSearchAreaConfigDict) {
              focusTab = BibleBroadcastTabId.Search;
            }

            bibleBroadcastKeyListenScopeAtom.set(nextListenScope);
          }
          if (isPreventDefault) event.preventDefault();

          if (checkIsNotNil(focusTab)) {
            const tabNet = bibleBroadcastGridTabsAtom.get();
            bibleBroadcastGridActiveTabiAtom.do.update(draft => {
              tabNet.find((tabs, tabsi) => {
                const tabi = tabs.indexOf(focusTab);
                if (tabi > -1) {
                  draft[tabsi] = tabi;
                  return true;
                }
              });
            });
            //
          }
        }),
      )
      .effect(
        ThrowEvent.listenKeyDown('Escape', () => {
          bibleBroadcastKeyListenScopeAtom.set(BibleBroadcastKeyListenScope.AAAddressNav);
        }),
      );
  }, [win]);
};
