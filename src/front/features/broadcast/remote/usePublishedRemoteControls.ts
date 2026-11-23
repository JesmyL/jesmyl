import { probeRemoteControlReachability } from '#features/broadcast/remote/connection';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RemoteBroadcastPublishedControl } from 'shared/api/tsjrpc.electtron/remote-broadcast';

export const usePublishedRemoteControls = (
  requestControls: () => Promise<RemoteBroadcastPublishedControl[]>,
) => {
  const [controls, setControls] = useState<RemoteBroadcastPublishedControl[] | null>(null);
  const [isLoadFailed, setIsLoadFailed] = useState(false);
  const [reachability, setReachability] = useState<{
    controls: RemoteBroadcastPublishedControl[];
    targets: Set<string>;
  } | null>(null);

  const reload = useCallback(() => {
    setIsLoadFailed(false);

    requestControls()
      .then(setControls)
      .catch(() => setIsLoadFailed(true));
  }, [requestControls]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (controls == null) return;

    let isActual = true;
    const targets = controls.map(control => `${control.ip}:${control.port}`);

    void Promise.all(
      targets.map(async target => ({ target, isReachable: await probeRemoteControlReachability(target) })),
    ).then(results => {
      if (!isActual) return;

      setReachability({
        controls,
        targets: new Set(results.filter(result => result.isReachable).map(result => result.target)),
      });
    });

    return () => {
      isActual = false;
    };
  }, [controls]);

  const reachableControls = useMemo(() => {
    if (controls == null || reachability?.controls !== controls) return controls;

    return controls.filter(control => reachability.targets.has(`${control.ip}:${control.port}`));
  }, [controls, reachability]);

  return { controls: reachableControls, isLoadFailed, reload };
};
