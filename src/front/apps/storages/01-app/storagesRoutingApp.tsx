import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { StoragesFooter } from '$storages/entities/Footer';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const storagesRoutingApp: RoutingAppConfig = {
  appName: 'storages',
  title: () => translateBase(BaseLocaleKey.StoragesTitle),
  footer: <StoragesFooter />,
  icon: 'Database',
};
