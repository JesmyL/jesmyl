import { addEventListenerPipe, hookEffectPipe } from 'front/complect/hookEffectPipe';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useEffect, useState } from 'react';

export default function useConnectionState(className?: string) {
  return (
    useIsOnline() || (
      <LazyIcon
        icon="Alert01"
        className={'color--ko ' + className}
      />
    )
  );
}

export const useIsOnline = () => {
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

  return isOnline;
};
