import { BottomPopup } from '#shared/ui/absolute-popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { isTouchDevice } from 'front/08-shared/lib/device-differences';
import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
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

export default function IndexConsolePage() {
  const [, setUpdates] = useState(0);
  const [isOpenBottom, setIsOpenBottom] = useState(false);

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
      onMoreClick={setIsOpenBottom}
      content={
        <>
          <div
            className="full-height"
            onTouchStart={eventStopper}
          >
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
          {isOpenBottom && (
            <BottomPopup onClose={setIsOpenBottom}>
              <BottomPopupItem
                icon="Cancel02"
                title="Очистить консоль"
                onClick={() => {
                  logs.length = 0;
                  setUpdates(itInc);
                }}
              ></BottomPopupItem>
            </BottomPopup>
          )}
        </>
      }
    />
  );
}

const Line = styled.div`
  overflow-wrap: anywhere;
`;
