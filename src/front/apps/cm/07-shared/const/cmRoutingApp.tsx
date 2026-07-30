import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { CmFooter } from '../ui/CmFooter';

export const cmRoutingApp: RoutingAppConfig = {
  appName: 'cm',
  title: () => translateBase(it => it.cm.t),
  footer: <CmFooter />,
  icon: 'BookOpen02',
};
