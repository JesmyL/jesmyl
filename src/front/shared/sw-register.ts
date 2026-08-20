import { atom } from 'atomaric';
import { registerSW } from 'virtual:pwa-register';

export const checkIsThereNewSWAtom = atom(false);
export let reloadSW = () => {};

if ('serviceWorker' in navigator) {
  reloadSW = registerSW({
    immediate: true,
    onNeedRefresh: () => checkIsThereNewSWAtom.set(true),
  });
}
