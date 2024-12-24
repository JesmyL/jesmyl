import { useEffect, useState } from 'react';
import { ThrowEvent } from '../../complect/eventer/ThrowEvent';
import { TheIconLoading } from '../../complect/the-icon/IconLoading';
import { IconAlert01StrokeRounded } from '../../complect/the-icon/icons/alert-01';
import { soki } from '../../soki';

export default function useConnectionState(className?: string) {
  const [isConnected, setIsConnected] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(
    () =>
      hookEffectLine().effect(
        soki.onConnectionState(setIsConnected),
        ThrowEvent.listenIsOnline(setIsOnline),
        ThrowEvent.listenIsWinFocused(setIsFocused),
      ),
    [],
  );

  useEffect(() => {
    if (isFocused) {
      const to = setTimeout(() => setIsConnected(false), 500);
      soki.ping(() => {
        clearTimeout(to);
        setIsConnected(true);
      });

      return () => clearTimeout(to);
    }
  }, [isFocused]);

  return isOnline ? (
    isConnected ? null : (
      <TheIconLoading
        className={className}
        onClick={() => soki.ping(() => setIsConnected(true))}
      />
    )
  ) : (
    <IconAlert01StrokeRounded className={'color--ko ' + className} />
  );
}
