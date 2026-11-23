import { useTranslateRemote } from '#features/broadcast/remote/remote-locale';
import { usePublishedRemoteControls } from '#features/broadcast/remote/usePublishedRemoteControls';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { useNavigate } from '@tanstack/react-router';
import { parseRemoteControlTarget, remoteBroadcastSecretCodeSearchParam } from 'shared/const/electron';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { makeRemoteScreenLink } from './control-link';

const requestRemoteControls = () =>
  schLiveTsjrpcClient.requestPublishedRemoteControls_1(undefined, { timeout: 10_000 });

export const RemoteControlConnectPopup = ({ onClose }: { onClose: () => void }) => {
  const tRemote = useTranslateRemote();
  const navigate = useNavigate();
  const { controls, isLoadFailed } = usePublishedRemoteControls(requestRemoteControls);

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

          return (
            <BottomPopupItem
              key={target}
              icon="ComputerPhoneSync"
              titleNode={
                <span className="flex column min-w-0">
                  <span className="truncate">{name}</span>
                  {name === target || <span className="text-xs opacity-60 truncate">{target}</span>}
                </span>
              }
              onClick={() => {
                if (parseRemoteControlTarget(target) == null) return;

                const link = makeRemoteScreenLink(target, control.secretCode);

                if (new URL(link).origin === location.origin) {
                  navigate({
                    to: '/remote/cm',
                    search: {
                      ...(control.secretCode == null
                        ? {}
                        : { [remoteBroadcastSecretCodeSearchParam]: control.secretCode }),
                    },
                  });
                  return;
                }

                location.assign(link);
              }}
            />
          );
        })
      )}
    </BottomPopup>
  );
};
