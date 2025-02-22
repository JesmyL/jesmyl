import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { HTMLAttributes, PropsWithChildren, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import './LoadIndicatedContent.scss';

const enum State {
  Initial = 'initial-state',
  Loading = 'loading-process',
  Loaded = 'content-loaded',
  Ending = 'ending-process',
  Ready = 'content-is-ready',
}

export function LoadIndicatedContent(
  props: PropsWithChildren<
    {
      isLoading: boolean;
      onLoad?: () => void;
      onLoaded?: () => void;
    } & HTMLAttributes<HTMLDivElement>
  >,
) {
  const [state, setState] = useState(State.Initial);
  const [isWasLoading, setIsWasLoading] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const initTime = useMemo(() => Date.now(), []);

  const onEnd = () => {
    setState(State.Loaded);
    props.onLoad?.();
    if (isWasLoading) props.onLoaded?.();
  };

  useEffect(() => setIsWasLoading(true), [state]);

  useLayoutEffect(() => {
    if (isInit) {
      setIsInit(false);
      return;
    }
    if (props.isLoading) setState(State.Loading);
    else {
      if (Date.now() - initTime < 200) onEnd();
      else setState(State.Ready);
    }
  }, [props.isLoading, isInit]);

  return (
    <div className={`load-indicated-content-container ${state} ${props.className || ''}`}>
      <div
        className="load-indicated-content-spinner-container"
        onAnimationEnd={() => state === State.Ending && onEnd()}
      >
        <JesmylLogo
          className="ringify"
          onAnimationIteration={() => state === State.Ready && setState(State.Ending)}
        />
      </div>
      {state === State.Loaded ? props.children : null}
    </div>
  );
}
