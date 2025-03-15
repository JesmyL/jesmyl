import { RoutingAppConfig } from '$app/lib/configs';
import { TheTunerFooter } from './TheTunerFooter';

export const tunerRoutingApp: RoutingAppConfig = {
  appName: 'tuner',
  title: 'Тюнер',
  footer: <TheTunerFooter />,
  icon: 'DashboardSpeed02',
};
