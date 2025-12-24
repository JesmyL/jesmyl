import { addDebouncedEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useEffect, useState } from 'react';

export const GamerMemoryGiantWinResizes = (props: {
  children: (winParameters: { w: number; h: number }) => React.ReactNode;
  win: Window;
}) => {
  const [winParameters, setWinParameters] = useState(() => ({ w: props.win.innerWidth, h: props.win.innerHeight }));

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addDebouncedEventListenerPipe(300, props.win, 'resize', () => {
          setWinParameters({ w: props.win.innerWidth, h: props.win.innerHeight });
        }),
      )
      .effect();
  }, [props.win]);

  return <>{props.children(winParameters)}</>;
};
