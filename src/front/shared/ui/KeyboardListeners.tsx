import { isMobileDevice } from '#shared/lib/device-differences';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useEffect } from 'react';
import { wait } from 'shared/utils';

export const KeyboardListeners = ({ onEnter, onEscape }: { onEnter: () => void; onEscape: () => void }) => {
  const actions = useActualRef({ onEscape, onEnter });

  useEffect(() => {
    if (isMobileDevice) return;

    const enterListener = ThrowEvent.listenKeyDown('Enter', async event => {
      if (event.value.shiftKey) return;

      event.stopPropagation();
      await wait(10);
      actions.current.onEnter();
    });

    const escapeListener = ThrowEvent.listenKeyDown('Escape', async event => {
      event.stopPropagation();
      await wait(10);
      actions.current.onEscape();
    });

    return () => {
      enterListener();
      escapeListener();
    };
  }, [actions]);

  return <></>;
};
