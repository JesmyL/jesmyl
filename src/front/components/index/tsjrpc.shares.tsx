import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { rootAppModalTextContentAtom } from '#shared/lib/atoms/rootAppModalTextContentAtom';
import { MyLib } from '#shared/lib/my-lib';
import { makeToastKOMoodConfig, makeToastOKMoodConfig } from '#shared/ui/modal/toast.configs';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { IndexTsjrpcSharesModel } from 'shared/api/tsjrpc/index/tsjrpc.methods.model';
import { toast } from 'sonner';
import { indexUserAccessRightsAtom } from './atoms';
import { lastUpdatedIconsMd5HashAtom } from './db/atoms';
import { indexIDB } from './db/index-idb';

export const indexTsjrpcBaseClient = new (class Index extends TsjrpcBaseClient<IndexTsjrpcSharesModel> {
  constructor() {
    super({
      scope: 'Index',
      methods: {
        refreshAccessRights: async ({ rights }) => {
          indexUserAccessRightsAtom.set(rights);
        },
        updateKnownIconPacks: async ({ actualIconPacks, iconsMd5Hash }) => {
          MyLib.entries(actualIconPacks).forEach(([iconName, pack]) => {
            if (pack !== null) indexIDB.tb.iconPacks.put({ key: iconName, pack });
            else indexIDB.tb.iconPacks.delete(iconName);
          });

          lastUpdatedIconsMd5HashAtom.set(iconsMd5Hash);
        },

        userModal: async props => rootAppModalTextContentAtom.set(props),

        userToast: async ({ text, config, icon, iconKind, mood }) => {
          toast(text, {
            ...(mood === 'ko'
              ? makeToastOKMoodConfig(config?.className)
              : mood === 'ok'
                ? makeToastKOMoodConfig(config?.className)
                : {}),
            ...config,
            icon: icon && (
              <LazyIcon
                icon={icon}
                kind={iconKind}
              />
            ),
          });
        },
      },
    });
  }
})();
