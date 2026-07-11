import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { soki } from '#shared/soki';
import { LocalSokiAuth, UserInfoUnsecure, UserLogin } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { UserAccessRole, UserAccessRoleInfo } from 'shared/model/index/access-rights';
import { authIDB, indexAppUserInfoDictAtom, indexAppUserRoleInfoDictAtom, indexIDB } from '../state';

const tgAuthorize = async ({ auth, token }: { auth: LocalSokiAuth; token: string }) => {
  await authIDB.set.auth(auth);
  await authIDB.set.token(token);

  soki.onBeforeAuthorizeEvent.invoke();
  setTimeout(() => soki.onAuthorizeEvent.invoke(), 100);
};

const userUpdaters = {
  onResponse: async (userDict: PRecord<UserLogin, UserInfoUnsecure> | null) => {
    if (!userDict) return;
    indexAppUserInfoDictAtom.set(prev => ({ ...prev, ...userDict }));
  },
};

const roleUpdaters = {
  onResponse: async (roleDict: PRecord<UserAccessRole, UserAccessRoleInfo> | null) => {
    if (!roleDict) return;
    indexAppUserRoleInfoDictAtom.set(prev => ({ ...prev, ...roleDict }));
  },
};

export const indexTsjrpcClientMethods = new (class Index extends TsjrpcClient<IndexTsjrpcModel> {
  constructor() {
    super({
      scope: 'Index',
      methods: {
        authMeByTelegramNativeButton: { onResponse: tgAuthorize },
        authMeByTelegramBotNumber: { onResponse: tgAuthorize },
        authMeByTelegramMiniButton: { onResponse: tgAuthorize },
        authMeByTelegramInScheduleDay: { onResponse: tgAuthorize },

        updateUserAccessRight: userUpdaters,
        updateUserAccessRole: userUpdaters,
        addNewAccessRole: roleUpdaters,
        updateRoleAccessRight: roleUpdaters,

        getIconPack: {
          onResponse: ({ pack }) => {
            indexIDB.tb.iconPacks.put({ key: pack[0] as never, pack });
          },
        },
      },
    });
  }
})();
