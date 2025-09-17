import { hideAppFooterAtom } from '#basis/lib/atoms/hideAppFooterAtom';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Atom, useAtomValue } from 'atomaric';
import { HTMLAttributes, PropsWithChildren, RefObject, useEffect, useRef, useState } from 'react';
import { itNIt } from 'shared/utils';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

export const RolledContent = ({
  speedKfAtom,
  elementRef,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  speedKfAtom: Atom<number>;
  elementRef?: RefObject<HTMLDivElement | null>;
}) => {
  const speedRollKf = useAtomValue(speedKfAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    hideAppFooterAtom.set(isRolling);
    const node = elementRef?.current ?? containerRef.current?.parentElement;

    if (node == null || !isRolling) return;

    let rollTimeout: TimeOut;
    let prevScrollTop = -1;
    let countsToStop = 20;

    const roll = () => {
      if (prevScrollTop === node.scrollTop && --countsToStop < 1) {
        setIsRolling(false);
        return;
      }
      prevScrollTop = node.scrollTop;
      node.scrollTop += 1;

      rollTimeout = setTimeout(roll, (20 - speedRollKf || 0.7) * 30);
    };

    roll();

    return () => {
      clearTimeout(rollTimeout);
      hideAppFooterAtom.reset();
    };
  }, [elementRef, isRolling, speedRollKf]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          if (event.code !== 'Space') return;
          event.preventDefault();
          setIsRolling(itNIt);
        }),
      )
      .effect();
  }, []);

  return (
    <RollContent
      {...props}
      onClick={() => setIsRolling(itNIt)}
      ref={containerRef}
      className={twMerge('roll-controled-container w-full h-full', props.className)}
    >
      <div className={'roll-controls pointer flex column center' + (isRolling ? ' open' : '')}>
        <LazyIcon
          icon="MinusSign"
          onClick={event => {
            event.stopPropagation();
            if (speedRollKf <= 1) return;
            speedKfAtom.do.increment(-1);
          }}
        />
        <div>{(speedRollKf / 10).toFixed(1)}</div>
        <LazyIcon
          icon="PlusSign"
          onClick={event => {
            event.stopPropagation();
            if (speedRollKf >= 20) return;
            speedKfAtom.do.increment(1);
          }}
        />
      </div>
      {props.children}
    </RollContent>
  );
};

const RollContent = styled.div`
  transition: padding 0.3s;
  padding: 0;

  [st-fullscreen] {
    padding-top: 30%;
  }

  .roll-controls {
    --height: 100px;

    position: fixed;
    top: calc(50vh - var(--height) / 2);
    right: 10px;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.7s;
    height: var(--height);
    pointer-events: none;

    > * {
      margin: 5px;
    }

    &.open {
      opacity: 0.7;
      pointer-events: all;
    }
  }
`;
