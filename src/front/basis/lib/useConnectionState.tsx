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
  const isOnlineAtom = atom(true);
  const uav = useAtomValue;
  const ret = () => uav(isOnlineAtom);

  window.addEventListener('online', () => isOnlineAtom.set(true));
  window.addEventListener('offline', () => isOnlineAtom.set(false));
  useIsOnline = ret;

  return ret();
};
