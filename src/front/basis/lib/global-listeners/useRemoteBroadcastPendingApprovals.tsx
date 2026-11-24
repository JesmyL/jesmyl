import { takeRemoteBroadcastDeviceName } from '#features/broadcast/remote/device';
import { translateRemote } from '#features/broadcast/remote/remote-locale';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { useConfirm } from '#shared/ui/modal';
import { useEffect, useRef } from 'react';
import { RemoteBroadcastPendingDevice } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';

export const useRemoteBroadcastPendingApprovals = () => {
  const confirm = useConfirm();
  const askedDeviceIdsRef = useRef(new Set<string>());
  const isConfirmingRef = useRef(false);

  useEffect(() => {
    if (!isElectronApp) return;

    let isActive = true;
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      const { approveRemoteControlDevice, banRemoteControlDevice, remoteBroadcastInfoAtom } = await import(
        '#features/broadcast/remote/controller'
      );
      if (!isActive) return;

      const handlePendingDevices = (pending: RemoteBroadcastPendingDevice[]) => {
        for (const deviceId of askedDeviceIdsRef.current) {
          if (!pending.some(device => device.deviceId === deviceId))
            askedDeviceIdsRef.current.delete(deviceId);
        }

        if (isConfirmingRef.current) return;

        const next = pending.find(device => !askedDeviceIdsRef.current.has(device.deviceId));
        if (next == null) return;

        askedDeviceIdsRef.current.add(next.deviceId);
        isConfirmingRef.current = true;

        void confirm(
          <div>
            {translateRemote(RemoteLocaleKey.ApproveRequest, {
              n: takeRemoteBroadcastDeviceName(next),
            })}
          </div>,
        )
          .then(isApproved =>
            isApproved ? approveRemoteControlDevice(next.deviceId) : banRemoteControlDevice(next.deviceId),
          )
          .finally(() => {
            isConfirmingRef.current = false;
            if (!isActive) return;

            handlePendingDevices(remoteBroadcastInfoAtom.get().pending ?? []);
          });
      };

      unsubscribe = remoteBroadcastInfoAtom.subscribe(info => handlePendingDevices(info.pending ?? []));
      handlePendingDevices(remoteBroadcastInfoAtom.get().pending ?? []);
    })();

    return () => {
      isActive = false;
      unsubscribe?.();
    };
  }, [confirm]);
};
