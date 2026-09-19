import { translateBase } from '#basis/locale';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useConfirm } from '#shared/ui/modal';
import { bibleBroadcastListSetSingleAddress } from '$bible/entities/broadcast-list';
import { takeJoinedAddressMaxValues } from '$bible/shared/hooks';
import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { useBibleCurrentLangi } from '$bible/shared/lib/useBibleCurrentLangi';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastCurrentSelectedIndexAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { emptyFunc } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { BibleBroadcastArchiveContentText } from '../ui/ContentText';

export const useBibleBroadcastArchiveListKeyListener = (
  win: Window,
  title: string,
  scope: BibleBroadcastKeyListenScope,
  list: BibleBroadcastAddress[] | nil,
  onRemove: (itemi?: number) => void,
) => {
  const confirm = useConfirm();
  const langi = useBibleCurrentLangi();
  const actualRef = useActualRef({ onRemove, langi });
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

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

    const [onWinEnter, onEffectEnter] =
      win === window ? [emptyFunc, ThrowEvent.listenKeyDown('Enter', onEnter)] : [onEnter, emptyFunc];

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'keydown', async event => {
          switch (event.code) {
            case 'Enter':
              onWinEnter();
              break;
            case 'Delete': {
              const selectedItemi = bibleBroadcastCurrentSelectedIndexAtom.get();
              if (event.ctrlKey) {
                if (await confirm(translateBase(it => it.bible.clearChapter, { c: title })))
                  actualRef.current.onRemove();
              } else if (
                await confirm(
                  <>
                    {makeBibleJoinedAddressText(actualRef.current.langi, list[selectedItemi], 'short')} -{' '}
                    <BibleBroadcastArchiveContentText item={list[selectedItemi]} />
                  </>,
                  translateBase(it => it.del),
                )
              )
                actualRef.current.onRemove(selectedItemi);

              break;
            }
          }
        }),
      )
      .effect(onEffectEnter);
  }, [actualRef, confirm, list, listenScope, scope, title, win]);
};
