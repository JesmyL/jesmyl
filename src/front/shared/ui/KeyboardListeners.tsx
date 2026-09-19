import { isMobileDevice } from '#shared/lib/device-differences';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useEffect } from 'react';

export const KeyboardListeners = ({ onEnter, onEscape }: { onEnter: () => void; onEscape: () => void }) => {
  const actions = useActualRef({ onEscape, onEnter });

  useEffect(() => {
    if (isMobileDevice) return;

    const enterListener = ThrowEvent.listenKeyDown('Enter', event => {
      if (event.value.shiftKey) return;

      event.stopPropagation();
      actions.current.onEnter();
    });

    const escapeListener = ThrowEvent.listenKeyDown('Escape', event => {
      event.stopPropagation();
      actions.current.onEscape();
    });

    return () => {
      enterListener();
      escapeListener();
    };
  }, [actions]);

  return <></>;
};
