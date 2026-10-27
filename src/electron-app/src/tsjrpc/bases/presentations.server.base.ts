import { TsjrpcElectronAppBase } from '../init/tsjrpc.base.electron';
import { ElectronPresentationsTsjrpcModel } from '../model';
import { readPresentationPreview, readPresentationSlides } from '../../presentations';

export const electronAppPresentationsTsjrpcBase =
  new (class BaseClient extends TsjrpcElectronAppBase<ElectronPresentationsTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentations1',
        methods: {
          openPresentation: async ({ filePath }) =>
            readPresentationSlides(filePath).catch(error => {
              console.error('[openPresentation]', error);
              return null;
            }),
          getPresentationPreview: async ({ filePath }) =>
            readPresentationPreview(filePath).catch(error => {
              console.error('[getPresentationPreview]', error);
              return null;
            }),
        },
      });
    }
  })();
