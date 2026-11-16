import { translateBase } from '#basis/locale';
import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { convertFileToBase64, takeBase64FromDataUrl } from '#shared/lib/convertFileToBase64';
import { setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { soki } from '#shared/soki';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { FileInput } from '#shared/ui/FileInput';
import { makeToastKOMoodConfig, Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheButton } from '#shared/ui/TheButton';
import {
  indexDeviceIdAtom,
  textTransferCountAtom,
  textTransferDevicesAtom,
  textTransferDevicesOpenAtom,
  textTransferDownloadAtom,
  textTransferFilesAtom,
  textTransferWindowsAtom,
} from '$index/shared/state';
import {
  startTextTransferFileDownload,
  textTransferFileReadyEvent,
  textTransferKickEvent,
  textTransferTsjrpcClient,
} from '$index/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc, formatBytes } from 'shared/utils';
import { toast } from 'sonner';

/** Скачивание собранного файла: base64 превращаем в Blob и отдаём браузеру через временную ссылку. */
const downloadTransferredFile = ({ name, data }: { name: string; data: string }) => {
  // Повреждённый base64 ловим здесь: при ошибке декодирования молча выходим, не создавая ссылку.
  // Тип буфера строго ArrayBuffer: Uint8Array.from создаёт его именно таким, а BlobPart не принимает ArrayBufferLike.
  let bytes: Uint8Array<ArrayBuffer>;
  try {
    bytes = Uint8Array.from(atob(data), char => char.charCodeAt(0));
  } catch {
    return;
  }

  // Временную ссылку освобождаем отложенно: синхронный revoke обрывает скачивание в Safari и Firefox.
  const url = URL.createObjectURL(new Blob([bytes]));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url));
};

export function IndexTextTransferPage() {
  const windows = useAtomValue(textTransferWindowsAtom);
  const files = useAtomValue(textTransferFilesAtom);
  const download = useAtomValue(textTransferDownloadAtom);
  const myDeviceId = useAtomValue(indexDeviceIdAtom);
  const count = useAtomValue(textTransferCountAtom);
  const { devices, owner } = useAtomValue(textTransferDevicesAtom);
  const { maxTransferFileSize } = useAtomValue(constantsConfigAtom);
  const putTextPipeRef = useRef<ReturnType<typeof setTimeoutPipe> | nil>(null);
  const leavePipeRef = useRef<ReturnType<typeof setTimeoutPipe> | nil>(null);

  // Вход в комнату при монтировании и выход при реальном размонтировании страницы.
  useEffect(() => {
    // Повторный монтаж (StrictMode) отменяет отложенный leave предыдущего прохода.
    leavePipeRef.current?.reset();

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
      // StrictMode сразу монтирует эффект заново и повторный join дедуплицируется клиентом,
      // поэтому leave шлём макрозадачей: повторный монтаж успеет её отменить и устройство не выйдет из комнаты.
      leavePipeRef.current = setTimeoutPipe(() => {
        textTransferTsjrpcClient.leave().catch(emptyFunc);
      }, 0);
    };
  }, []);

  // Собранный файл приходит событием после всех кусков: скачиваем его через временную ссылку.
  useEffect(() => textTransferFileReadyEvent.listen(({ name, data }) => downloadTransferredFile({ name, data })), []);

  // Отправка выбранного файла: проверяем объём, читаем файл в чистый base64 и шлём на сервер.
  const putMyFile = async (file: File) => {
    if (file.size > maxTransferFileSize * 1024 * 1024) {
      toast(translateBase(BaseLocaleKey.TextTransferFileTooLarge, { s: maxTransferFileSize }), makeToastKOMoodConfig());
      return;
    }

    textTransferTsjrpcClient
      .putFile({
        name: file.name,
        type: file.type,
        data: takeBase64FromDataUrl(await convertFileToBase64(file)),
      })
      .catch(error => toast('' + error, makeToastKOMoodConfig()));
  };

  // Показываем только файлы чужих устройств: собственный файл отправителю скачивать не нужно.
  const receivedFiles = files.filter(file => file.deviceId !== myDeviceId);

  const putMyText = (text: string) => {
    textTransferWindowsAtom.set(windows.map(window => (window.deviceId === myDeviceId ? { ...window, text } : window)));

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
          {/* custom-align-items: без него глобальный .flex центрирует колонку, и строки файлов растягиваются по max-content. */}
          <div className="flex custom-align-items flex-col gap-2 pb-2">
            {/* Кнопка выбора файла: в подписи показан лимит объёма; файл передаётся параллельно тексту и только один. */}
            <FileInput
              onFilesSelect={files => {
                // Отправляем ровно один файл за выбор: сервер хранит только последний файл устройства.
                const [file] = files;
                if (file) void putMyFile(file);
              }}
              renderTrigger={({ fileInputRef }) => (
                <TheButton
                  className="self-start px-3 py-0.5 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {translateBase(BaseLocaleKey.ConfigPickFile, { v: false, max: maxTransferFileSize })}
                </TheButton>
              )}
            />
            {receivedFiles.length === 0 || (
              <div className="flex custom-align-items flex-col gap-1">
                {receivedFiles.map(file => {
                  const downloading = download?.deviceId === file.deviceId ? download : null;
                  const progress = downloading == null || downloading.count === 0 ? 0 : downloading.loaded / downloading.count;

                  return (
                    <div
                      key={file.deviceId}
                      className="flex custom-align-items min-w-0 flex-col gap-1 rounded bg-x2/40 px-2 py-1"
                    >
                      {/* Имя и размер: объём рядом с именем; длинное имя обрезается многоточием,
                          а кнопка скачивания прижата справа и не сжимается. */}
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="min-w-0 flex-1 truncate text-xs">
                          {file.name} <span className="opacity-60">· {formatBytes(file.size)}</span>
                        </span>
                        <TheButton
                          className="shrink-0 px-3 py-0 text-[.75em]"
                          disabled={download != null}
                          onClick={download == null ? () => startTextTransferFileDownload(file) : undefined}
                        >
                          {translateBase(BaseLocaleKey.Download)}
                        </TheButton>
                      </div>
                      {/* Тонкий индикатор заполняется по мере прихода кусков и виден только у скачиваемого файла. */}
                      {downloading == null || (
                        <div className="h-0.5 overflow-hidden rounded bg-x3">
                          <div
                            className="h-full bg-x7"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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
