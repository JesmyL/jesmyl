import { ReactNode, useCallback } from 'react';
import { atom, useAtom } from '../atoms';
import Portal from '../popups/[complect]/Portal';
import useMountTransition from '../popups/useMountTransition';

let popupContent: ReactNode = null;
let floatElement: HTMLDivElement | null;
let isFloated = false;
let isClosed = true;
let isClosable = true;
let onOpenPopup: ((close: () => boolean) => void) | und;

const isOpenAtom = atom(false);

export default function useAbsoluteFloatPopup() {
  const [isAbsoluteFloatPopupOpen, close] = useAtom(isOpenAtom);

  const closeAbsoluteFloatPopup = useCallback(() => {
    close(false);
    if (isFloated) popupContent = null;
    if (isClosed) return false;
    isClosed = true;
    return true;
  }, [close]);

  return {
    isAbsoluteFloatPopupOpen,
    closeAbsoluteFloatPopup,
    openAbsoluteFloatPopup: useCallback(
      (content: ReactNode, x: number, y: number, closable = true) => {
        isClosable = closable;
        isClosed = false;
        onOpenPopup?.(closeAbsoluteFloatPopup);
        popupContent = content;
        close(true);

        setTimeout(() => {
          if (!floatElement) return;
          const top =
            y + floatElement.clientHeight > window.innerHeight ? window.innerHeight - floatElement.clientHeight - 5 : y;
          const left =
            x + floatElement.clientWidth > window.innerWidth ? window.innerWidth - floatElement.clientWidth - 5 : x;

          floatElement.style.top = `${top >= 0 ? top : 5}px`;
          floatElement.style.left = `${left >= 0 ? left : 5}px`;
        });
      },
      [close, closeAbsoluteFloatPopup],
    ),
  };
}

export function ABSOLUTE__FLOAT__POPUP({ onOpen }: { onOpen: (close: () => boolean) => void }) {
  onOpenPopup = onOpen;
  const { isAbsoluteFloatPopupOpen, closeAbsoluteFloatPopup } = useAbsoluteFloatPopup();

  const [isMounted, className] = useMountTransition(
    isAbsoluteFloatPopupOpen && !!popupContent,
    'absolute-float-popup',
    500,
  );

  return (
    <>
      {isMounted && (
        <Portal>
          <div
            className={className}
            onClick={() => closeAbsoluteFloatPopup()}
          >
            <div
              className={`absolute-popup-content`}
              onClick={event => !isClosable && event.stopPropagation()}
              ref={elem => elem && (floatElement = elem)}
            >
              {popupContent}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
