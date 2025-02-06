import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Eventer, EventerListeners } from 'shared/utils';
import styled from 'styled-components';
import { IconCancel01StrokeRounded } from '../../complect/the-icon/icons/cancel-01';
import { backSwipableContainerMaker } from '../backSwipableContainerMaker';
import { ThrowEvent } from '../eventer/ThrowEvent';
import Portal from '../popups/[complect]/Portal';
import IconButton from '../the-icon/IconButton';

const swipeEvents: EventerListeners<void> = [];

const swiper = backSwipableContainerMaker(() => Eventer.invoke(swipeEvents, undefined));

export type FullContentOpenMode = null | 'open' | 'closable';
export type FullContentValue<PassValue = unknown> = (close: () => void, passValue?: PassValue) => ReactNode;

export default function useFullContent<PassValue>(
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
          className={mode}
          onClick={mode === 'closable' ? onClose : undefined}
          {...swiper}
        >
          {mode === 'closable' ? null : (
            <IconButton
              Icon={IconCancel01StrokeRounded}
              className="pointer close-button"
              onClick={onClose}
            />
          )}
          <Container className={altClassName ?? 'padding-big-gap'}>
            {content?.(() => setOpenMode(null), passValue)}
          </Container>
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
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100%;

  &:not(.closable) {
    > .close-button {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 100;
    }
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--current-bg);
  width: 100vw;
  height: calc(100% - var(--keyboard-flash-height));
  overflow-y: auto;
`;
