import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { TheTunerFooter } from './TheTunerFooter';

export const tunerRoutingApp: RoutingAppConfig = {
  appName: 'tuner',
  title: () => translateBase(BaseLocaleKey.TunerTitle),
  footer: <TheTunerFooter />,
  icon: 'DashboardSpeed02',
};
