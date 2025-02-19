import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { LazyIcon } from '#shared/ui/icon';
import { useEffect, useState } from 'react';

export const useConnectionState = (className?: string) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(
    () =>
      hookEffectPipe()
        .pipe(
          addEventListenerPipe(window, 'online' as never, () => setIsOnline(true)),
          addEventListenerPipe(window, 'offline' as never, () => setIsOnline(false)),
        )
        .effect(),
    [],
  );

  return (
    isOnline || (
      <LazyIcon
        icon="Alert01"
        className={'color--ko ' + className}
      />
    )
  );
};
