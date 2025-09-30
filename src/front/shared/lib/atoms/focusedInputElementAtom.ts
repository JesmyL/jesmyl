import { atom } from 'atomaric';

export const focusedInputElementAtom = atom<Element | null>(null);

let isFired = false;
let prevElement: Element | null = null;

const checkFocus = () => {
  if (isFired) return;
  isFired = true;

  setTimeout(() => {
    isFired = false;
    if (document.activeElement === null) return;

    const element =
      document.activeElement.tagName === 'TEXTAREA' ||
      document.activeElement.tagName === 'INPUT' ||
      document.activeElement.hasAttribute('contenteditable')
        ? document.activeElement
        : null;

    if (prevElement === element) return;

    prevElement?.removeEventListener('blur', checkFocus, true);
    prevElement?.removeEventListener('blur', checkFocus, false);

    element?.addEventListener('blur', checkFocus, true);
    element?.addEventListener('blur', checkFocus, false);

    prevElement = element;
    focusedInputElementAtom.set(element);
  }, 300);
};

const enevtNames: (keyof WindowEventMap)[] = [
  'click',
  'mouseup',
  'mousedown',
  'touchstart',
  'touchend',
  'touchcancel',
  'keydown',
  'keyup',
  'keypress',
];

enevtNames.forEach(eventName => {
  window.addEventListener(eventName, checkFocus, true);
  window.addEventListener(eventName, checkFocus, false);
});
