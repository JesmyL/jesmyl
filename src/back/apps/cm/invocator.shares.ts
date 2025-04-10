import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmShareSokiInvocatorModel } from 'shared/api/invocators/cm/share-invocator.model';

export const cmShareServerInvocatorMethods = new (class CmShare extends SokiInvocatorServer<CmShareSokiInvocatorModel> {
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
        refreshAboutComFavorites: true,

        refreshScheduleEventComPacks: true,
      },
    });
  }
})();
