import { dialog } from 'electron';
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
        },
      });
    }
  })();
