import { defaultQueryClient } from '#basis/config/queryClient';
import { constantsConfigAtom } from '#basis/state/constantsAtom';
import {
  localeLastModifiedAtAtom,
  takeBaseLanguageAtom,
  takeEditorLanguageAtom,
  takeDynamicLanguageAtom,
} from '#basis/state/locale';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { rootAppModalTextContentAtom } from '#shared/lib/atoms/rootAppModalTextContentAtom';
import { makeToastKOMoodConfig, makeToastOKMoodConfig } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { localeIsLoadingAtom } from '$app/store/triggers';
import type { InfiniteData } from '@tanstack/react-query';
import { IndexTsjrpcSharesModel } from 'shared/api/tsjrpc/index/tsjrpc.methods.model';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { VisitsDashboard } from 'shared/model/index/visitsDashboard';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { toast } from 'sonner';
import { indexDashMessageVersionAtom, indexIDB, indexUserAccessRightsAtom, indexVisitsOnlineAtom, lastUpdatedIconsMd5HashAtom } from '../state';

/** Каждый пришедший словарь несёт свою отметку свежести: храним самую позднюю. */
const updateLocaleModifiedAt = (mod: number) => localeLastModifiedAtAtom.set(prev => Math.max(prev, mod));

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

        visitsOnline: async ({ count }) => {
          indexVisitsOnlineAtom.set(count);
        },

        dashMessage: async ({ message }) => {
          defaultQueryClient.setQueriesData<InfiniteData<VisitsDashboard, number>>(
            { queryKey: ['visitsDashboardMessages', message.kind] },
            data => {
              const firstPage = data?.pages[0];

              if (!firstPage || firstPage.messages.some(({ id }) => id === message.id)) return data;

              return {
                ...data,
                pages: [
                  {
                    ...firstPage,
                    messages: [message, ...firstPage.messages],
                    unreadCounts: {
                      ...firstPage.unreadCounts,
                      [message.kind]: (firstPage.unreadCounts[message.kind] ?? 0) + 1,
                    },
                  },
                  ...data.pages.slice(1),
                ],
              };
            },
          );

          indexDashMessageVersionAtom.set(version => version + 1);
        },

        baseLocConf: async ({ base, mod }) => {
          takeBaseLanguageAtom().set(base);
          updateLocaleModifiedAt(mod);
          localeIsLoadingAtom.do.increment(-1);
        },

        editorLocConf: async ({ editor, mod }) => {
          takeEditorLanguageAtom().set(editor);
          updateLocaleModifiedAt(mod);
        },

        dynLocConf: async ({ dyns, mod }) => {
          dyns.forEach(config => takeDynamicLanguageAtom(config[DynLocaleKey.Langi]).set(config));
          updateLocaleModifiedAt(mod);
          localeIsLoadingAtom.do.increment(-dyns.length);
        },
      },
    });
  }
})();
