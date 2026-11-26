import { probeRemoteControlReachability } from '#features/broadcast/remote/connection';
import { useCallback, useEffect, useState } from 'react';
import { RemotePublishedControlScoped } from 'shared/api/remote-controls';

const makeTarget = (control: RemotePublishedControlScoped) => `${control.ip}:${control.port}`;

export const usePublishedRemoteControls = (requestControls: () => Promise<RemotePublishedControlScoped[]>) => {
  const [controls, setControls] = useState<RemotePublishedControlScoped[] | null>(null);
  const [isLoadFailed, setIsLoadFailed] = useState(false);
  const [reachability, setReachability] = useState<{
    controls: RemotePublishedControlScoped[];
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
    const targets = controls.map(makeTarget);

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

  const reachableTargets = reachability?.controls === controls ? reachability.targets : null;

  return { controls, isLoadFailed, reload, reachableTargets };
};
