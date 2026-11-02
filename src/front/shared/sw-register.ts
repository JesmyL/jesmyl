import { atom } from 'atomaric';
import { registerSW } from 'virtual:pwa-register';

export const checkIsThereNewSWAtom = atom(false);

let isUpdateInitiated = false;
let updateSW = () => {};

if ('serviceWorker' in navigator) {
  updateSW = registerSW({
    immediate: false,
    onNeedRefresh: () => checkIsThereNewSWAtom.set(true),
  });

  // controllerchange fires both on the first install and after an initiated update:
  // reload only when the update was requested by the user.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (isUpdateInitiated) window.location.reload();
  });
}

export const reloadSW = () => {
  isUpdateInitiated = true;
  updateSW();
};

export const closeAllAppNotifications = async () => {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;

  (await registration.getNotifications()).forEach(notification => notification.close());
};
