import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { Box, SwipeableDrawer } from '@mui/material';
import { ReactNode, useEffect, useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import { BottomPopupOnCloseContext } from './context';

interface Props {
  children?: ReactNode;
  onClose: (is: false) => void;
  isPreventCloseOnClick?: boolean;
  id?: string;
}

export const BottomPopup = ({ children, onClose, isPreventCloseOnClick, id }: Props) => {
  const popupContainer = useRef<HTMLDivElement>(null);
  const overContentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => ThrowEvent.listenKeyDown('Escape', () => onClose(false)), [onClose]);

  useEffect(() => {
    if (popupContainer.current === null) return;

    const popupContainerNode = popupContainer.current;

    return hookEffectLine()
      .addEventListener(popupContainerNode, 'scroll', () => {
        if (popupContainerNode.scrollTop === 0) onClose(false);
      })
      .effect();
  }, [onClose]);

  useEffect(() => {
    if (overContentContainer.current === null || popupContainer.current === null) return;
    popupContainer.current.scrollTop = overContentContainer.current.clientHeight;
  }, []);

  return (
    <>
      <Popup
        id={id}
        anchor="bottom"
        open
        onOpen={emptyFunc}
        onClose={() => onClose(false)}
      >
        <BottomPopupOnCloseContext.Provider value={isPreventCloseOnClick ? emptyFunc : () => setTimeout(onClose, 100)}>
          <Box className="bg-x1 py-5 sm:px-3 xl:px-7 text-x4">{children}</Box>
        </BottomPopupOnCloseContext.Provider>
      </Popup>
    </>
  );
};

const Popup = styled(SwipeableDrawer)`
  > * {
    scroll-snap-align: start;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .icon-box {
    --size: 2.5em;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: var(--size);
    min-width: var(--size);
    max-width: var(--size);
    height: var(--size);
    min-height: var(--size);
    max-height: var(--size);

    &.active {
      background: var(--color--2);
    }

    .abs-icon {
      margin: var(--main-gap);
    }
  }
`;
