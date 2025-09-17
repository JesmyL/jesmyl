import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function useConnectionState(className?: string) {
  return (
    useIsOnline() || (
      <LazyIcon
        icon="Alert01"
        className={twMerge('text-xKO', className)}
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
