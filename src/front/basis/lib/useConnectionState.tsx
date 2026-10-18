import { addEventListenerPipe } from '#shared/lib/hookEffectPipe';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom, useAtomValue } from 'atomaric';
import { twMerge } from 'tailwind-merge';

export const useConnectionState = (className?: string) =>
  useIsOnline() ? null : (
    <LazyIcon
      icon="Alert01"
      className={twMerge('text-xKO', className)}
    />
  );

export let useIsOnline = () => {
  const isOnlineAtom = atom(navigator.onLine);
  const syncWithNetwork = () => isOnlineAtom.set(navigator.onLine);

  addEventListenerPipe(window, 'online', syncWithNetwork);
  addEventListenerPipe(window, 'offline', syncWithNetwork);
  addEventListenerPipe(document, 'visibilitychange', () => {
    if (document.visibilityState === 'visible') syncWithNetwork();
  });

  useIsOnline = () => useAtomValue(isOnlineAtom);

  return useAtomValue(isOnlineAtom);
};
