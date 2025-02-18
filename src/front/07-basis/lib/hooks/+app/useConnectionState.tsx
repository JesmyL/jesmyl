import { addEventListenerPipe, hookEffectPipe } from 'front/08-shared/lib/hookEffectPipe';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useEffect, useState } from 'react';

export default function useConnectionState(className?: string) {
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
}
