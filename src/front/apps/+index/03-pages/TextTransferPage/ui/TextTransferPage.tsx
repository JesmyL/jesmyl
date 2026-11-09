import { translateBase } from '#basis/locale';
import { setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { soki } from '#shared/soki';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TheButton } from '#shared/ui/TheButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import {
  indexDeviceIdAtom,
  textTransferCountAtom,
  textTransferDevicesAtom,
  textTransferDevicesOpenAtom,
  textTransferWindowsAtom,
} from '$index/shared/state';
import { textTransferKickEvent, textTransferTsjrpcClient } from '$index/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';

export function IndexTextTransferPage() {
  const windows = useAtomValue(textTransferWindowsAtom);
  const myDeviceId = useAtomValue(indexDeviceIdAtom);
  const count = useAtomValue(textTransferCountAtom);
  const { devices, owner } = useAtomValue(textTransferDevicesAtom);
  const putTextPipeRef = useRef<ReturnType<typeof setTimeoutPipe> | nil>(null);

  useEffect(() => {
    const join = () => {
      textTransferTsjrpcClient
        .join()
        .then(({ windows, count }) => {
          textTransferWindowsAtom.set(windows ?? []);
          textTransferCountAtom.set(count);
        })
        .catch(emptyFunc);
    };

    const unlistenOpen = soki.listenOnConnectionOpenEvent(join);
    const unlistenKick = textTransferKickEvent.listen(join);

    return () => {
      unlistenOpen();
      unlistenKick();
      putTextPipeRef.current?.reset();
      textTransferTsjrpcClient.leave().catch(emptyFunc);
    };
  }, []);

  const putMyText = (text: string) => {
    textTransferWindowsAtom.set(
      windows.map(window => (window.deviceId === myDeviceId ? { ...window, text } : window)),
    );

    putTextPipeRef.current?.reset();
    putTextPipeRef.current = setTimeoutPipe(() => {
      textTransferTsjrpcClient.putText({ text }).catch(emptyFunc);
    }, 500);
  };

  return (
    <PageContainerConfigurer
      className=""
      headTitle={translateBase(BaseLocaleKey.TextTransfer)}
      head={
        <button
          className="pointer min-w-6 rounded bg-x5 px-1.5"
          onClick={() => {
            textTransferDevicesOpenAtom.set(true);
            textTransferTsjrpcClient
              .getDevices()
              .then(devices => textTransferDevicesAtom.set(devices))
              .catch(emptyFunc);
          }}
        >
          {count}
        </button>
      }
      content={
        <>
          <div className="flex custom-align-items h-full flex-col gap-2">
            {windows
              .toSorted((left, right) => left.deviceId.localeCompare(right.deviceId))
              .map(window => {
                const isMine = window.deviceId === myDeviceId;

                return (
                  <div
                    key={window.deviceId}
                    className={`flex custom-align-items min-h-40 max-h-[50%] flex-1 flex-col rounded bg-x2/40 p-2 ${isMine ? 'border border-x7' : ''}`}
                  >
                    <div className="flex items-center gap-2 pb-1">
                      <span className="text-xl">{window.emoji}</span>
                      <span className="min-w-0 flex-1 truncate text-xs opacity-70">
                        {[window.browser, window.os].filter(Boolean).join(' · ')}
                      </span>
                      <span className="shrink-0 text-[.75em] text-x6">{window.ip}</span>
                      {isMine || !window.text || (
                        <CopyTextButton
                          text={window.text}
                          withoutIcon
                          description={
                            <TheButton className="px-3 py-0.5 text-xs">{translateBase(BaseLocaleKey.Copy)}</TheButton>
                          }
                        />
                      )}
                    </div>
                    <textarea
                      className="min-h-0 w-full flex-1 resize-none bg-transparent!"
                      value={window.text}
                      readOnly={!isMine}
                      onChange={isMine ? event => putMyText(event.currentTarget.value) : undefined}
                    />
                  </div>
                );
              })}
          </div>
          <Modal openAtom={textTransferDevicesOpenAtom}>
            <ModalHeader>
              {translateBase(BaseLocaleKey.TextTransfer)}
              {owner ? ` — ${owner}` : ''}
            </ModalHeader>
            <ModalBody>
              {devices.map((device, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded px-1 py-1 ${device.isThisDevice ? 'bg-x4/20' : ''}`}
                >
                  <span className="text-xl">{device.emoji}</span>
                  <span className="min-w-0 flex-1 truncate text-[.75em] opacity-70">
                    {[device.browser, device.os].filter(Boolean).join(' · ')}
                  </span>
                  <span className="text-right text-[.75em] text-x6">
                    <span className="block">{device.ip}</span>
                    <span className="block">v{device.version}</span>
                  </span>
                  {!device.isThisDevice || (
                    <LazyIcon
                      icon="CheckmarkCircle01"
                      className="text-xOK"
                    />
                  )}
                </div>
              ))}
            </ModalBody>
          </Modal>
        </>
      }
    />
  );
}
