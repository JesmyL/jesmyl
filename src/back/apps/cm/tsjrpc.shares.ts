import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { CmShareTsjrpcModel } from 'shared/api/tsjrpc/cm/share.tsjrpc.model';

export const cmShareServerTsjrpcMethods = new (class CmShare extends TsjrpcServerMethods<CmShareTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmShare',
      methods: {
        editedCom: true,
        refreshComList: true,

        editedCat: true,
        refreshCatList: true,

        editedChords: true,
        refreshChordPack: true,

        refreshComComments: true,
        refreshComCommentBlocks: true,
        refreshAboutComFavorites: true,

        refreshScheduleEventComPacks: true,
      },
    });
  }
})();
