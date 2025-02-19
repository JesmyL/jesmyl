import { PhaseContainerConfigurer } from 'front/complect/phase-container/PhaseContainerConfigurer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isTouchDevice } from '../../../../complect/device-differences';
import { useBottomPopup } from '../../../../shared/ui/absolute-popup/bottom-popup/useBottomPopup';
import { CodeExecutionScreen } from './coder/Coder';
import { CoderResultLine } from './coder/complect/line';

const logs: unknown[][] = [];

const itInc = (num: number) => num + 1;
const eventStopper = (event: { stopPropagation(): void }) => event.stopPropagation();

let forceUpdate = () => {};
const scope = isTouchDevice ? 'log' : 'group';
const log = console[scope];

console[scope] = ((...args: unknown[]) => {
  logs.push(args);
  log(...args);
  forceUpdate();
}) as never;

export default function IndexConsole() {
  const [, setUpdates] = useState(0);
  const [bottomNode, openBottom] = useBottomPopup((_isOpen, _close, prepare) => {
    return prepare({
      items: [
        {
          icon: 'Cancel02',
          title: 'Очистить консоль',
          onClick: () => {
            logs.length = 0;
            setUpdates(itInc);
          },
        },
      ],
    });
  });

  useEffect(() => {
    let timeout: TimeOut;
    forceUpdate = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setUpdates(itInc));
    };

    return () => {
      forceUpdate = () => {};
      clearTimeout(timeout);
    };
  }, []);

  return (
    <PhaseContainerConfigurer
      className="index-settings-console"
      headTitle="Консоль"
      onMoreClick={openBottom}
      content={
        <div
          className="full-height"
          onTouchStart={eventStopper}
        >
          {bottomNode}
          <Line>
            <CoderResultLine
              value={logs}
              scope="Console."
            />
          </Line>
          <CodeExecutionScreen
            onError={error => console[scope](new Error('' + error))}
            onLog={console[scope]}
          />
        </div>
      }
    />
  );
}

const Line = styled.div`
  overflow-wrap: anywhere;
`;
