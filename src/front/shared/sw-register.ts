import { atom } from 'atomaric';
import { registerSW } from 'virtual:pwa-register';

export const checkIsThereNewSWAtom = atom(false);
export let reloadSW = () => {};

if ('serviceWorker' in navigator) {
  reloadSW = registerSW({
    immediate: false,
    onNeedRefresh: () => checkIsThereNewSWAtom.set(true),
  });
}

export const closeAllAppNotifications = async () => {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;

  (await registration.getNotifications()).forEach(notification => notification.close());
};
