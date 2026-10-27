import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { PresentationsFooter } from './PresentationsFooter';

export const presentationsRoutingApp: RoutingAppConfig = {
  appName: 'presentations',
  title: () => translateBase(BaseLocaleKey.Presentations),
  footer: <PresentationsFooter />,
  icon: 'Presentation01',
};
