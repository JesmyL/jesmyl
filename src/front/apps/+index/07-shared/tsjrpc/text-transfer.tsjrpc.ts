import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { TextTransferFile, TextTransferTsjrpcModel, TextTransferTsjrpcSharesModel } from 'shared/api';
import { Eventer } from 'shared/utils';
import { toast } from 'sonner';
import {
  textTransferCountAtom,
  textTransferDownloadAtom,
  textTransferFilesAtom,
  textTransferWindowsAtom,
} from '../state';

export const textTransferKickEvent = Eventer.createValue();
// Готовый файл: страница получает собранный base64 и скачивает его через временную ссылку.
export const textTransferFileReadyEvent = Eventer.createValue<{ name: string; data: string }>();

// Куски текущего скачивания копятся в модуле; в реактивном атоме держим только прогресс.
let downloadedFileChunks: string[] = [];
let downloadedChunkIndexes = new Set<number>();

export const textTransferTsjrpcClient = new (class TextTransfer extends TsjrpcClient<TextTransferTsjrpcModel> {
  constructor() {
    super({
      scope: 'TextTransfer',
    });
  }
})();

export const textTransferTsjrpcBaseClient =
  new (class TextTransferTsjrpcBaseClient extends TsjrpcBaseClient<TextTransferTsjrpcSharesModel> {
    constructor() {
      super({
        scope: 'TextTransfer',
        methods: {
          texts: async ({ windows }) => textTransferWindowsAtom.set(windows ?? []),
          // Сервер присылает полный набор метаданных файлов комнаты: сразу замещаем им прежний список.
          files: async ({ files }) => textTransferFilesAtom.set(files),
          // Складываем куски по индексам; на последнем — собираем base64 и отдаём его странице событием.
          fileChunk: async ({ deviceId, name, chunk, index, count }) => {
            const download = textTransferDownloadAtom.get();
            if (download?.deviceId !== deviceId) return;

            downloadedFileChunks[index] = chunk;
            downloadedChunkIndexes.add(index);
            const loaded = downloadedChunkIndexes.size;

            if (loaded < count) {
              textTransferDownloadAtom.set({ deviceId, name, loaded, count });
              return;
            }

            const data = downloadedFileChunks.join('');
            downloadedFileChunks = [];
            downloadedChunkIndexes = new Set();
            textTransferDownloadAtom.set(null);
            textTransferFileReadyEvent.invoke({ name, data });
          },
          count: async ({ count }) => textTransferCountAtom.set(count),
          kick: async () => textTransferKickEvent.invoke(),
        },
      });
    }
  })();

/** Готовит приём кусков и просит сервер отдать файл устройства только этому клиенту. */
export const startTextTransferFileDownload = (file: TextTransferFile) => {
  if (textTransferDownloadAtom.get() != null) return;

  downloadedFileChunks = [];
  downloadedChunkIndexes = new Set();
  textTransferDownloadAtom.set({ deviceId: file.deviceId, name: file.name, loaded: 0, count: 0 });

  textTransferTsjrpcClient.takeFile({ deviceId: file.deviceId }).catch(error => {
    textTransferDownloadAtom.set(null);
    toast('' + error, makeToastKOMoodConfig());
  });
};
