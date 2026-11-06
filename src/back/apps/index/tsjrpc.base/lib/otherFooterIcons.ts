import { translateBaseTexts } from 'back/locales/base';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { objectKeys } from 'shared/utils/object.utils';
import { randomItem } from 'shared/randoms';
import { indexStameskaIconsFileStore, otherFooterIconFileStore } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { checkIsFreshClientVersion } from './checkIsFreshClientVersion';

const takeExistingIconNamesSet = () => new Set(objectKeys(indexStameskaIconsFileStore.getValue()));

export const rotateOtherFooterIcon = () => {
  const store = otherFooterIconFileStore.getValue();
  if (!store.iconNames.length) return null;

  const availableIconNames =
    store.iconNames.length > 1 ? store.iconNames.filter(iconName => iconName !== store.icon) : store.iconNames;

  store.icon = randomItem(availableIconNames);
  store.m = Date.now();
  otherFooterIconFileStore.saveValue();

  return store.icon;
};

export const indexTSJRPCBaseOtherFooterIcons = {
  getOtherFooterIcons: async (_, { auth }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    const store = otherFooterIconFileStore.getValue();
    const existingIconNames = takeExistingIconNamesSet();
    const iconNames = store.iconNames.filter(iconName => existingIconNames.has(iconName));

    if (iconNames.length !== store.iconNames.length) {
      store.iconNames = iconNames;
      otherFooterIconFileStore.saveValue();
    }

    return { value: { iconNames } };
  },

  updateOtherFooterIcons: async ({ iconNames }, { auth, visitInfo }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    const existingIconNames = takeExistingIconNamesSet();
    const unknownIconName = iconNames.find(iconName => !existingIconNames.has(iconName));
    if (unknownIconName !== undefined)
      throw translateBaseTexts(visitInfo?.langi, BaseLocaleKey.OtherFooterIconUnknown, { n: unknownIconName });

    const store = otherFooterIconFileStore.getValue();
    store.iconNames = iconNames;
    otherFooterIconFileStore.saveValue();

    await indexServerTsjrpcShareMethods.otherFooterIconNames({ iconNames }, checkIsFreshClientVersion);

    return { value: { iconNames } };
  },

  updateOtherFooterIcon: async (_, { auth, visitInfo }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    const icon = rotateOtherFooterIcon();
    if (icon === null) throw translateBaseTexts(visitInfo?.langi, BaseLocaleKey.OtherFooterIconListEmpty);

    return { value: { icon } };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
