import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastCurrentSelectedIndexAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { RefObject, useEffect } from 'react';

export const useBibleBroadcastArchiveItemHighlight = (
  listRef: RefObject<HTMLDivElement | null>,
  scope: BibleBroadcastKeyListenScope,
) => {
  const selectedItemi = useAtomValue(bibleBroadcastCurrentSelectedIndexAtom);
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  useEffect(() => {
    if (listenScope !== scope) return;
    let tries = 5;

    let node: Element | nil;
    let timeout: TimeOut;

    const detect = () => {
      node = listRef.current?.querySelector(`[data-archive-itemi="${selectedItemi}"]`);

      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        node.classList.add('bg-x2');
      } else if (tries-- > 0) timeout = setTimeout(detect, 100);
    };

    detect();

    return () => {
      clearTimeout(timeout);
      node?.classList.remove('bg-x2');
    };
  }, [listRef, listenScope, scope, selectedItemi]);
};
