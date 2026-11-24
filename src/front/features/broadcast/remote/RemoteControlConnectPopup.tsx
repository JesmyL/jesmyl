import { useTranslateRemote } from '#features/broadcast/remote/remote-locale';
import { usePublishedRemoteControls } from '#features/broadcast/remote/usePublishedRemoteControls';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { authIDB } from '$index/shared/state/auth-idb';
import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { ScheduleWidgetWid } from 'shared/api';
import {
  parseRemoteControlTarget,
  remoteBroadcastSecretCodeSearchParam,
  remoteBroadcastUserNameSearchParam,
} from 'shared/const/electron';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { makeRemoteScreenLink } from './control-link';

const requestRemoteControls = (schw: ScheduleWidgetWid | nil) =>
  schLiveTsjrpcClient.requestPublishedRemoteControls_2({ schw }, { timeout: 10_000 });

export const RemoteControlConnectPopup = ({
  onClose,
  schw,
}: {
  onClose: () => void;
  schw: ScheduleWidgetWid | nil;
}) => {
  const tRemote = useTranslateRemote();
  const navigate = useNavigate();
  const requestControls = useCallback(() => requestRemoteControls(schw), [schw]);
  const { controls, isLoadFailed, reachableTargets } = usePublishedRemoteControls(requestControls);

  return (
    <BottomPopup
      title={tRemote(RemoteLocaleKey.AvailableList)}
      onClose={onClose}
    >
      {isLoadFailed && !controls?.length ? (
        <div className="px-7 py-2 text-xKO text-sm">{tRemote(RemoteLocaleKey.ListLoadError)}</div>
      ) : controls == null ? null : controls.length === 0 ? (
        <div className="px-7 py-2 text-x7 text-sm">{tRemote(RemoteLocaleKey.EmptyList)}</div>
      ) : (
        controls.map(control => {
          const target = `${control.ip}:${control.port}`;
          const name = takeUserAuthName(control) || target;
          const isDisabled = !control.isConnectable || (reachableTargets != null && !reachableTargets.has(target));

          return (
            <BottomPopupItem
              key={target}
              icon="ComputerPhoneSync"
              className={isDisabled ? 'opacity-50 pointer-events-none' : ''}
              titleNode={
                <span className="flex column min-w-0">
                  <span className="truncate">{name}</span>
                  {name === target || <span className="text-xs opacity-60 truncate">{target}</span>}
                </span>
              }
              onClick={
                isDisabled
                  ? undefined
                  : async () => {
                      if (parseRemoteControlTarget(target) == null) return;

                      const auth = await authIDB.get.auth();
                      const fio = takeUserAuthName(auth);
                      const link = makeRemoteScreenLink(target, control.secretCode, fio || undefined);

                      if (new URL(link).origin === location.origin) {
                        navigate({
                          to: '/remote/cm',
                          search: {
                            ...(control.secretCode == null
                              ? {}
                              : { [remoteBroadcastSecretCodeSearchParam]: control.secretCode }),
                            ...(fio ? { [remoteBroadcastUserNameSearchParam]: fio } : {}),
                          },
                        });
                        return;
                      }

                      location.assign(link);
                    }
              }
            />
          );
        })
      )}
    </BottomPopup>
  );
};
