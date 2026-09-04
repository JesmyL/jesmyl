import { translateBase } from '#basis/locale';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useConfirm } from '#shared/ui/modal';
import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { BibleTranslatesContextProvider } from '$bible/ext';
import { takeJoinedAddressMaxValues } from '$bible/shared/hooks';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastCurrentSelectedIndexAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { emptyFunc } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { BibleBroadcastArchiveList } from '../ui/ArchiveList';

export const useBibleBroadcastArchiveListKeyListener = (
  win: Window,
  title: string,
  scope: BibleBroadcastKeyListenScope,
  list: BibleBroadcastAddress[] | nil,
  onRemove: (itemi?: number) => void,
) => {
  const confirm = useConfirm();
  const actualRef = useActualRef({ onRemove });
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);
  const isSubWindow = win !== window;

  useEffect(() => {
    if (listenScope !== scope || !list) return;

    const onEnter = () => {
      const selectedItemi = bibleBroadcastCurrentSelectedIndexAtom.get();

      const item = list[selectedItemi];
      if (checkIsArray(item)) {
        bibleBroadcastListSetSingleAddress(...item);
        bibleJoinAddressAtom.reset();
      } else {
        bibleJoinAddressAtom.set([item]);
        bibleBroadcastListSetSingleAddress(...takeJoinedAddressMaxValues(item));
      }
    };

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', async event => {
          const selectedItemi = bibleBroadcastCurrentSelectedIndexAtom.get();

          switch (event.code) {
            case 'Enter':
              if (isSubWindow) onEnter();
              break;
            case 'Delete':
              if (event.ctrlKey) {
                if (await confirm(translateBase(it => it.bible.clearChapter, { c: title })))
                  actualRef.current.onRemove();
              } else if (
                await confirm(
                  <BibleTranslatesContextProvider>
                    <BibleBroadcastArchiveList
                      list={list}
                      scope={scope}
                    >
                      {nodeList => nodeList?.[selectedItemi]}
                    </BibleBroadcastArchiveList>
                  </BibleTranslatesContextProvider>,
                  translateBase(it => it.del),
                )
              )
                actualRef.current.onRemove(selectedItemi);

              break;
          }
        }),
      )
      .effect(isSubWindow ? emptyFunc : ThrowEvent.listenKeyDown('Enter', onEnter));
  }, [actualRef, confirm, isSubWindow, list, listenScope, scope, title, win]);
};
