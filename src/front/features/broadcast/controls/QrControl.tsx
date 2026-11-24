import { makeRemoteControlLink } from '#features/broadcast/remote/control-link';
import { useTranslateRemote } from '#features/broadcast/remote/remote-locale';
import { takeRemoteBroadcastDeviceName } from '#features/broadcast/remote/device';
import {
  approveRemoteControlDevice,
  banRemoteControlDevice,
  loadRemoteBroadcastInfo,
  remoteBroadcastInfoAtom,
  setRemoteBroadcastServerPort,
  startRemoteBroadcastServer,
  unbanRemoteControlDevice,
} from '#features/broadcast/remote/controller';
import { Button } from '#shared/components/ui/button';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { usePrompt } from '#shared/ui/modal';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import { TextInput } from '#shared/ui/TextInput';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import { ElectronRemoteBroadcastInfo, RemoteBroadcastErrorKind } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';

const remoteBroadcastAutoConnectAttempts = 10;
const remoteBroadcastAutoConnectDelayMs = 1500;

export const QrControl = () => {
  if (!isElectronApp) return null;

  return (
    <div className="p-3 h-full overflow-y-auto flex column gap-3">
      <RemoteBroadcastPanel />
    </div>
  );
};

const RemoteBroadcastPanel = () => {
  const tRemote = useTranslateRemote();
  const info = useAtomValue(remoteBroadcastInfoAtom);
  const [port, setPort] = useState(String(info.port));
  const [isPending, setIsPending] = useState(false);
  const [isQrVisible, setIsQrVisible] = useState(false);
  const [isInfoLoaded, setIsInfoLoaded] = useState(false);
  const [autoConnectAttempti, setAutoConnectAttempti] = useState(0);
  const [isAutoConnectExhausted, setIsAutoConnectExhausted] = useState(false);
  const remoteControlLink = info.isOn && info.url ? makeRemoteControlLink(info.url) : '';

  useEffect(() => {
    void loadRemoteBroadcastInfo().finally(() => setIsInfoLoaded(true));
  }, []);

  useEffect(() => setPort(String(info.port)), [info.port]);

  const prompt = usePrompt();
  const promptedPortBusyRef = useRef<string | nil>(null);

  useEffect(() => {
    if (info.error !== RemoteBroadcastErrorKind.PortBusy) {
      promptedPortBusyRef.current = null;
      return;
    }

    const errorKey = `${info.error}:${info.port}`;
    if (promptedPortBusyRef.current === errorKey) return;

    promptedPortBusyRef.current = errorKey;

    const defaultValue = String(info.port + 1);
    const showPrompt = () =>
      prompt(
        tRemote(RemoteLocaleKey.PortBusy, { p: info.port }),
        tRemote(RemoteLocaleKey.PortBusyPrompt),
        defaultValue,
      );

    void (async () => {
      let value = await showPrompt();

      while (value != null) {
        const nextPort = Number(value);

        if (Number.isInteger(nextPort) && nextPort >= 1 && nextPort <= 65535) {
          await setRemoteBroadcastServerPort(nextPort);
          return;
        }

        value = await showPrompt();
      }
    })();
  }, [info.error, info.port, prompt, tRemote]);

  useEffect(() => {
    if (!isInfoLoaded) return;

    if (info.isOn) {
      setIsAutoConnectExhausted(false);
      setAutoConnectAttempti(0);
      return;
    }

    if (isAutoConnectExhausted) return;

    if (autoConnectAttempti >= remoteBroadcastAutoConnectAttempts) {
      setIsAutoConnectExhausted(true);
      return;
    }

    const timeout = setTimeout(
      () => {
        void startRemoteBroadcastServer().finally(() => setAutoConnectAttempti(attempti => attempti + 1));
      },
      autoConnectAttempti === 0 ? 0 : remoteBroadcastAutoConnectDelayMs,
    );

    return () => clearTimeout(timeout);
  }, [autoConnectAttempti, info.isOn, isAutoConnectExhausted, isInfoLoaded]);

  const commitPort = () => {
    if (isPending) return;

    const nextPort = Number(port);

    if (!Number.isInteger(nextPort) || nextPort < 1 || nextPort > 65535) {
      setPort(String(info.port));
      return;
    }

    if (nextPort === info.port) return;

    setIsPending(true);
    void setRemoteBroadcastServerPort(nextPort).finally(() => setIsPending(false));
  };

  const restartAutoConnect = () => {
    if (isPending) return;

    setAutoConnectAttempti(0);
    setIsAutoConnectExhausted(false);
    setIsPending(true);

    const action = info.isOn ? loadRemoteBroadcastInfo() : startRemoteBroadcastServer();
    void action.finally(() => setIsPending(false));
  };

  const errorText =
    info.error === RemoteBroadcastErrorKind.PortBusy
      ? tRemote(RemoteLocaleKey.PortBusy, { p: info.port })
      : info.error === RemoteBroadcastErrorKind.NoLanAddress
        ? tRemote(RemoteLocaleKey.NoLan)
        : info.error === RemoteBroadcastErrorKind.Unknown
          ? tRemote(RemoteLocaleKey.UnknownError)
          : '';

  return (
    <>
      <div className="flex gap-2 items-center">
        <span className={info.isOn ? 'text-x3' : 'text-xKO'}>
          {tRemote(info.isOn ? RemoteLocaleKey.Connected : RemoteLocaleKey.Disconnected)}
        </span>
        {info.isOn || (
          <Button
            size="sm"
            disabled={isPending}
            onClick={restartAutoConnect}
          >
            {tRemote(RemoteLocaleKey.Connect)}
          </Button>
        )}
      </div>

      <label className="flex gap-2 items-center">
        <span>{tRemote(RemoteLocaleKey.Port)}</span>
        <TextInput
          className="w-[100px]"
          type="number"
          min={1}
          max={65535}
          value={port}
          disabled={isPending}
          isStopPropagation
          onInput={setPort}
          onBlur={commitPort}
          onKeyDown={event => {
            event.stopPropagation();
            if (event.key === 'Enter') commitPort();
          }}
        />
      </label>

      {!errorText || <div className="text-xKO">{errorText}</div>}

      {!remoteControlLink || (
        <div className="flex column gap-2 items-center">
          <div className="flex gap-2 items-center">
            <TheIconButton
              icon="QrCode"
              kind={isQrVisible ? 'SolidRounded' : undefined}
              onClick={() => setIsQrVisible(!isQrVisible)}
            />
            <CopyTextButton
              text={remoteControlLink}
              message={tRemote(RemoteLocaleKey.Copied, { a: remoteControlLink })}
            />
          </div>
          {!isQrVisible || (
            <QRCode
              text={remoteControlLink}
              className="w-full max-w-[320px]"
            />
          )}
        </div>
      )}

      <RemoteBroadcastPending pending={info.pending ?? []} />
      <RemoteBroadcastControllers controllers={info.controllers ?? []} />
      <RemoteBroadcastBanned banned={info.banned ?? []} />
    </>
  );
};

const RemoteBroadcastPending = ({ pending }: { pending: ElectronRemoteBroadcastInfo['pending'] }) => {
  const tRemote = useTranslateRemote();

  if (pending.length === 0) return null;

  return (
    <div className="flex column gap-1">
      <div className="text-sm font-semibold">{tRemote(RemoteLocaleKey.PendingList)}</div>
      {pending.map(device => (
        <div
          key={device.deviceId}
          className="flex gap-2 items-center text-sm"
        >
          <span
            className="truncate flex-1"
            title={device.deviceId}
          >
            {takeRemoteBroadcastDeviceName(device)}
          </span>
          <button
            className="pointer text-xOK whitespace-nowrap"
            onClick={() => approveRemoteControlDevice(device.deviceId)}
          >
            {tRemote(RemoteLocaleKey.Approve)}
          </button>
          <button
            className="pointer text-xKO whitespace-nowrap"
            onClick={() => banRemoteControlDevice(device.deviceId)}
          >
            {tRemote(RemoteLocaleKey.Ban)}
          </button>
        </div>
      ))}
    </div>
  );
};

const RemoteBroadcastControllers = ({ controllers }: { controllers: ElectronRemoteBroadcastInfo['controllers'] }) => {
  const tRemote = useTranslateRemote();

  return (
    <div className="flex column gap-1">
      <div className="text-sm font-semibold">{tRemote(RemoteLocaleKey.ControllersList)}</div>
      {controllers.length === 0 ? (
        <div className="text-sm opacity-60">{tRemote(RemoteLocaleKey.NoControllers)}</div>
      ) : (
        controllers.map(controller => (
          <div
            key={controller.deviceId}
            className="flex gap-2 items-center text-sm"
          >
            <span
              className="truncate flex-1"
              title={controller.deviceId}
            >
              {(() => {
                const shownName = takeRemoteBroadcastDeviceName(controller);

                return controller.promptName != null && controller.promptName !== shownName
                  ? `${shownName} (${controller.promptName})`
                  : shownName;
              })()}
            </span>
            <span className="opacity-60 whitespace-nowrap">{new Date(controller.since).toLocaleTimeString()}</span>
            <button
              className="pointer text-xKO whitespace-nowrap"
              onClick={() => banRemoteControlDevice(controller.deviceId)}
            >
              {tRemote(RemoteLocaleKey.Ban)}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const RemoteBroadcastBanned = ({ banned }: { banned: ElectronRemoteBroadcastInfo['banned'] }) => {
  const tRemote = useTranslateRemote();

  if (banned.length === 0) return null;

  return (
    <div className="flex column gap-1">
      <div className="text-sm font-semibold">{tRemote(RemoteLocaleKey.BannedList)}</div>
      {banned.map(device => (
        <div
          key={device.deviceId}
          className="flex gap-2 items-center text-sm"
        >
          <span
            className="truncate flex-1"
            title={device.deviceId}
          >
            {takeRemoteBroadcastDeviceName(device)}
          </span>
          <button
            className="pointer text-xOK whitespace-nowrap"
            onClick={() => unbanRemoteControlDevice(device.deviceId)}
          >
            {tRemote(RemoteLocaleKey.Unban)}
          </button>
        </div>
      ))}
    </div>
  );
};
