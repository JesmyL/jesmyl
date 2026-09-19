import { dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import { TsjrpcElectronAppBase } from '../init/tsjrpc.base.electron';
import { ElectronBasicTsjrpcModel } from '../model';

export const electronAppBasicTsjrpcBase =
  new (class BaseClient extends TsjrpcElectronAppBase<ElectronBasicTsjrpcModel> {
    constructor() {
      super({
        scope: 'Basic',
        methods: {
          selectFiles: async () => {
            const result = await dialog.showOpenDialog({
              properties: ['openFile', 'multiSelections'],
              filters: [
                { name: 'Изображения', extensions: ['jpg', 'png', 'gif'] },
                { name: 'Все файлы', extensions: ['*'] },
              ],
            });

            return result.canceled ? [] : result.filePaths;
          },

          selectDir: async ({ create }) => {
            const result = await dialog.showOpenDialog({
              properties: ['openDirectory'],
            });
            let dir = result.filePaths[0];

            if (create && dir) {
              dir = path.resolve(dir, dir.split(create)[0], create);
              fs.mkdirSync(dir, { recursive: true });
            }

            return dir;
          },
        },
      });
    }
  })();
