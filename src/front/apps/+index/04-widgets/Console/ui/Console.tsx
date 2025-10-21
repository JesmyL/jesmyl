/* eslint-disable no-console */
import { isTouchDevice } from '#shared/lib/device-differences';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IndexConsoleCoderResultLine } from '../sub-ui/line';
import { IndexConsoleCodeExecutionScreen } from './Coder';

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

export const IndexConsolePage = () => {
  const [, setUpdates] = useState(0);

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
    <PageContainerConfigurer
      className="index-settings-console"
      headTitle="Консоль"
      content={
        <div
          className="h-full"
          onTouchStart={eventStopper}
        >
          <Line>
            <IndexConsoleCoderResultLine
              value={logs}
              scope="Console."
            />
          </Line>
          <IndexConsoleCodeExecutionScreen
            onError={error => console[scope](new Error('' + error))}
            onLog={console[scope]}
          />
        </div>
      }
    />
  );
};

const Line = styled.div`
  overflow-wrap: anywhere;
`;
