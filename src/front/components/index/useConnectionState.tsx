import { addEventListenerPipe, hookEffectPipe } from 'front/complect/hookEffectPipe';
import { useEffect, useState } from 'react';
import { IconAlert01StrokeRounded } from '../../complect/the-icon/icons/alert-01';

export default function useConnectionState(className?: string) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(
    () =>
      hookEffectPipe()
        .pipe(
          addEventListenerPipe(window, 'online' as never, () => setIsOnline(true)),
          addEventListenerPipe(window, 'offline' as never, () => setIsOnline(false)),
        )
        .effect(),
    [],
  );

  return isOnline || <IconAlert01StrokeRounded className={'color--ko ' + className} />;
}
