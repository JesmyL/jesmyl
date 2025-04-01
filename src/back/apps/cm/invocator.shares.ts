import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmSokiInvocatorSharesModel } from 'shared/api/invocators/cm/invocator.shares.model';

export const cmServerInvocatorShareMethods =
  new (class CmSokiInvocatorServer extends SokiInvocatorServer<CmSokiInvocatorSharesModel> {
    constructor() {
      super({
        className: 'CmSokiInvocatorServer',
        methods: {
          editedCom: true,
          refreshComList: true,

          editedCat: true,
          refreshCatList: true,

          editedChords: true,
          refreshChordPack: true,

          refreshComComments: true,
          refreshAboutComFavorites: true,

          refreshScheduleEventComPacks: true,
        },
      });
    }
  })();
