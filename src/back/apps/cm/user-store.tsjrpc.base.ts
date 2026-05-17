import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { CmUserStoreTsjrpcModel } from 'shared/api/tsjrpc/cm/user-store.tsjrpc.model';
import { aboutComFavoritesFileStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmUserStoreTsjrpcBaseServer = new (class CmUserStore extends TsjrpcBaseServer<CmUserStoreTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmUserStore',
      methods: {
        setAboutComFavorites: (args, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);

          aboutComFavoritesFileStore.modifyValueWithAutoSave(favorites => {
            const authLogin = auth.login;

            favorites[authLogin] ??= { m: 0, fio: '' };
            favorites[authLogin].m = Date.now();
            favorites[authLogin].fio ||= auth.fio || '';

            if (args.comws != null) favorites[authLogin].comws = args.comws;
            if (args.tools != null) favorites[authLogin].tools = args.tools;

            cmShareServerTsjrpcMethods.refreshAboutComFavorites(
              { value: favorites[authLogin] },
              (_, a) => a?.login === authLogin,
            );
          });
        },
      },
    });
  }
})();
