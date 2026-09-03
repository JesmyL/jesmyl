import { translateBase } from '#basis/locale';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useConfirm } from '#shared/ui/modal';
import { BibleTranslatesContextProvider } from '$bible/ext';
import { bibleAddressIndexesUpdate, takeJoinedAddressMaxValues } from '$bible/shared/hooks';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastCurrentSelectedIndexAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { ReactNode, useEffect } from 'react';
import { checkIsArray } from 'shared/utils/checkIs';

export const useBibleBroadcastArchiveListKeyListener = (
  title: string,
  scope: BibleBroadcastKeyListenScope,
  list: BibleBroadcastAddress[] | nil,
  nodeList: ReactNode[] | nil,
  onRemove: (itemi?: number) => void,
) => {
  const confirm = useConfirm();
  const actualRef = useActualRef({ nodeList, onRemove });
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  useEffect(() => {
    if (listenScope !== scope || !list) return;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', async event => {
          const selectedItemi = bibleBroadcastCurrentSelectedIndexAtom.get();

          switch (event.code) {
            case 'Delete':
              if (event.ctrlKey) {
                if (await confirm(translateBase(it => it.bible.clearChapter, { c: title })))
                  actualRef.current.onRemove();
              } else if (
                await confirm(
                  <BibleTranslatesContextProvider>
                    {actualRef.current.nodeList?.[selectedItemi]}
                  </BibleTranslatesContextProvider>,
                  translateBase(it => it.del),
                )
              )
                actualRef.current.onRemove(selectedItemi);

              break;
          }
        }),
      )
      .effect(
        ThrowEvent.listenKeyDown('Enter', event => {
          const selectedItemi = bibleBroadcastCurrentSelectedIndexAtom.get();
          // event.stopPropagation();

          const item = list[selectedItemi];
          if (checkIsArray(item)) {
            bibleAddressIndexesUpdate(...item);
            bibleJoinAddressAtom.reset();
          } else {
            bibleJoinAddressAtom.set([item]);
            bibleAddressIndexesUpdate(...takeJoinedAddressMaxValues(item));
          }
        }),
      );
  }, [actualRef, confirm, list, listenScope, scope]);
};
