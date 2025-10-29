import { RoutingAppConfig } from '$app/lib/configs';
import { StoragesFooter } from '$storages/entities/Footer';

export const storagesRoutingApp: RoutingAppConfig = {
  appName: 'storages',
  title: 'Склад',
  footer: <StoragesFooter />,
  icon: 'Database',
};
