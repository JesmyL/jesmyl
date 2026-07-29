import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { takeBaseLanguageAtom, takeDynamicLanguageAtom } from '#basis/state/locale';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { rootAppModalTextContentAtom } from '#shared/lib/atoms/rootAppModalTextContentAtom';
import { makeToastKOMoodConfig, makeToastOKMoodConfig } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { IndexTsjrpcSharesModel } from 'shared/api/tsjrpc/index/tsjrpc.methods.model';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { toast } from 'sonner';
import { indexIDB, indexUserAccessRightsAtom, lastUpdatedIconsMd5HashAtom } from '../state';

export const indexTsjrpcBaseClient = new (class Index extends TsjrpcBaseClient<IndexTsjrpcSharesModel> {
  constructor() {
    super({
      scope: 'Index',
      methods: {
        refreshAccessRights: async ({ rights, mod: lastModifiedAt }) => {
          indexUserAccessRightsAtom.set(rights);
          indexIDB.updateLastModifiedAt(lastModifiedAt);
        },
        updateKnownIconPacks: async ({ actualIconPacks, iconsMd5Hash }) => {
          forEachObjectEntries(actualIconPacks, (iconName, pack) => {
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

        constConfig: async ({ config, mod }) => {
          constantsConfigAtom.set(prev => ({ ...prev, ...config }));
          await indexIDB.updateLastModifiedAt(mod);
        },

        baseLocConf: async ({ base, mod }) => {
          takeBaseLanguageAtom().set(base);
          await indexIDB.updateLastModifiedAt(mod);
        },

        dynLocConf: async ({ mod, dyns }) => {
          dyns.forEach(config => takeDynamicLanguageAtom(config.langi).set(config));
          await indexIDB.updateLastModifiedAt(mod);
        },
      },
    });
  }
})();
