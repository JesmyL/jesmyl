import { propagationStopper } from 'front/complect/utils/utils';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ThrowEvent } from '../../eventer/ThrowEvent';
import Portal from '../../popups/[complect]/Portal';
import useMountTransition from '../../popups/useMountTransition';

export const useFloatPopupCoords = <Additions,>(initState: ({ x: number; y: number } & Additions) | null = null) =>
  useState(initState);

export function FloatPopup<Additions>({
  onClose,
  children,
  coords,
}: {
  onClose: (reset: null) => void;
  children?: React.ReactNode;
  coords: { x: number; y: number } & Additions;
}) {
  const [isMounted, className] = useMountTransition(!!children, 'absolute-float-popup', 500);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current === null) return;
    const node = contentRef.current;

    node.style.top = `10000px`;
    node.style.left = `10000px`;

    setTimeout(() => {
      const top = coords.y + node.clientHeight + 40 > window.innerHeight ? coords.y - node.clientHeight : coords.y;
      const left = coords.x + node.clientWidth + 40 > window.innerWidth ? coords.x - node.clientWidth : coords.x;

      node.style.top = `${top >= 0 ? top : 5}px`;
      node.style.left = `${left >= 0 ? left : 5}px`;
    });
  }, [coords.x, coords.y]);

  useEffect(() => ThrowEvent.listenKeyDown('Escape', () => onClose(null)), [onClose]);

  return (
    <>
      {isMounted && (
        <Portal>
          <StyledScreen
            className={className}
            onClick={() => onClose(null)}
          >
            <StyledContent
              onClick={propagationStopper}
              ref={contentRef}
            >
              {children}
            </StyledContent>
          </StyledScreen>
        </Portal>
      )}
    </>
  );
}

const StyledContent = styled.div`
  position: absolute;
  top: -1000px;
  left: -1000px;
  box-shadow: 0 0 40px var(--color--2);
  border-radius: 10px;
  background: var(--color--1);
  padding: 10px 10px;
`;

const StyledScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 350;
  transition: opacity 0.2s;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  &.mounted {
    opacity: 1;
    pointer-events: all;
  }
`;
