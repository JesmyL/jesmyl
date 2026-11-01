import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import styled from '@emotion/styled';
import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Eventer, EventerListeners } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import { Portal } from '../Portal';
import { LazyIcon } from '../the-icon/LazyIcon';

const swipeEvents: EventerListeners<void> = [];

const swiper = backSwipableContainerMaker(() => Eventer.invoke(swipeEvents, undefined));

export type FullContentOpenMode = null | 'open' | 'closable';
export type FullContentValue<PassValue = unknown> = (close: () => void, passValue?: PassValue) => ReactNode;

export function useFullContent<PassValue>(
  content: FullContentValue<PassValue> | nil,
  forceOpenMode?: FullContentOpenMode,
  switchIsForceOpen?: (is: boolean) => void,
  altClassName?: string,
): [ReactNode, (isClosable?: boolean, passValue?: PassValue) => void, () => void] {
  const [openMode, setOpenMode] = useState<FullContentOpenMode>(null);
  const [passValue, setPassValue] = useState<PassValue>();
  const mode = forceOpenMode === undefined ? openMode : forceOpenMode;
  const switchIsForceOpenRef = useRef(switchIsForceOpen);
  switchIsForceOpenRef.current = switchIsForceOpen;

  const onClose = useCallback(<El,>(event?: MouseEvent<El> | KeyboardEvent) => {
    event?.stopPropagation();
    setOpenMode(null);
    switchIsForceOpenRef.current?.(false);
  }, []);

  useEffect(() => {
    if (mode) {
      const close: PropagationStopper = event => {
        event.stopPropagation();
        onClose();
      };

      const swipeClose = Eventer.listen(swipeEvents, close);
      const escape = ThrowEvent.listenKeyDown('Escape', close);

      return () => {
        swipeClose();
        escape();
      };
    }
  }, [mode, onClose]);

  return [
    mode && (
      <Portal>
        <ContainerWrapper
          className={`${mode} absolute top-0 left-0 z-[999] w-screen h-full`}
          onClick={mode === 'closable' ? onClose : undefined}
          {...swiper}
        >
          {mode === 'closable' ? null : (
            <LazyIcon
              icon="Cancel01"
              className="pointer close-button"
              onClick={onClose}
            />
          )}
          <div
            className={twMerge(
              'absolute top-0 left-0 bg-(--current-bg) w-screen h-full overflow-y-auto',
              altClassName ?? 'pt-5',
            )}
          >
            {content?.(() => setOpenMode(null), passValue)}
          </div>
        </ContainerWrapper>
      </Portal>
    ),
    (isClosable, passValue) => {
      setOpenMode(isClosable ? 'closable' : 'open');
      setPassValue(passValue);
    },
    () => setOpenMode(null),
  ];
}

const ContainerWrapper = styled.div`
  &:not(.closable) > .close-button {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 100;
  }
`;
