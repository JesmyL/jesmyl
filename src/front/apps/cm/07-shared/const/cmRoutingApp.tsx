import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmFooter } from '../ui/CmFooter';

export const cmRoutingApp: RoutingAppConfig = {
  appName: 'cm',
  title: () => translateBase(BaseLocaleKey.CmApp),
  footer: <CmFooter />,
  icon: 'BookOpen02',
};
