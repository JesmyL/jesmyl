import { translateRemote } from '#features/broadcast/remote/remote-locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';
import { RemoteFooter } from './RemoteFooter';

export const remoteRoutingApp: RoutingAppConfig = {
  appName: 'remote',
  title: () => translateRemote(RemoteLocaleKey.AppTitle),
  footer: <RemoteFooter isOtherHidden />,
  icon: 'ComputerPhoneSync',
};
