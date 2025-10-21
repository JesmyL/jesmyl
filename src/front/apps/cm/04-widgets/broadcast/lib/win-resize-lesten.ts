import { useEffect, useReducer } from 'react';

const forceUpdater = (it: number) => it + 1;

export const useCmBroadcastScreenWinResizeListen = (win: Window | nil) => {
  const [forceUpdates, forceUpdate] = useReducer(forceUpdater, 0);

  useEffect(() => {
    if (win == null || win === window) return;
    let debounceTimeout: TimeOut;

    const updater = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(forceUpdate, 300);
    };

    win.addEventListener('resize', updater);
    return () => win.removeEventListener('resize', updater);
  }, [win]);

  return forceUpdates;
};
