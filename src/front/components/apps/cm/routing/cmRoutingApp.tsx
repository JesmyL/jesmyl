import { RoutingAppConfig } from '$app/lib/configs';
import { CmFooter } from './CmFooter';

export const cmRoutingApp: RoutingAppConfig = {
  appName: 'cm',
  title: 'Песни возрождённых',
  footer: <CmFooter />,
  icon: 'BookOpen02',
};
