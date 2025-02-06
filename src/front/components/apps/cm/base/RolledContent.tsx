import { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IconMinusSignStrokeRounded } from '../../../../complect/the-icon/icons/minus-sign';
import { IconPlusSignStrokeRounded } from '../../../../complect/the-icon/icons/plus-sign';
import { useFullScreen } from '../../../../complect/useFullscreen';
import { cmIDB } from '../_db/cm-idb';

export default function RollControled(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const [isFullscreen] = useFullScreen();
  const [speedRollKf, setSpeedRollKf] = cmIDB.use.speedRollKf();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (containerRef.current?.parentElement == null || !isRolling) return;
    const node = containerRef.current.parentElement;
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

    return () => clearTimeout(rollTimeout);
  }, [isRolling, speedRollKf]);

  return (
    <RollContent
      {...props}
      onClick={() => setIsRolling(is => !is)}
      ref={containerRef}
      className={
        'roll-controled-container full-width full-height' +
        (isFullscreen ? ' fullscreen' : '') +
        ('' + (props.className || ''))
      }
    >
      <div className={'roll-controls pointer flex column center' + (isRolling ? ' open' : '')}>
        <IconMinusSignStrokeRounded
          onClick={event => {
            event.stopPropagation();
            if (speedRollKf <= 1) return;
            setSpeedRollKf(speedRollKf - 1);
          }}
        />
        <div>{(speedRollKf / 10).toFixed(1)}</div>
        <IconPlusSignStrokeRounded
          onClick={event => {
            event.stopPropagation();
            if (speedRollKf >= 20) return;
            setSpeedRollKf(speedRollKf + 1);
          }}
        />
      </div>
      {props.children}
    </RollContent>
  );
}

const RollContent = styled.div`
  transition: padding 0.3s;
  padding: 0;

  &.fullscreen {
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
