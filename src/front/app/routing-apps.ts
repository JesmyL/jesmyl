import { bibleRoutingApp } from '../components/apps/bible/routing/bibleRoutingApp';
import { cmRoutingApp } from '../components/apps/cm/routing/cmRoutingApp';
import { tunerRoutingApp } from '../components/apps/tuner/tunerRoutingApp';
import { AppName } from './App.model';

export type RoutingAppConfig = {
  appName: AppName;
  router: (mainNode: React.ReactNode) => React.ReactNode;
  footer: React.ReactNode;
  title: React.ReactNode;
  icon: TheIconKnownName;
  lazies: React.ReactNode[];
  level: number;
};

export const routingApps: Partial<Record<AppName, RoutingAppConfig>> = {
  cm: cmRoutingApp,
  bible: bibleRoutingApp,
  tuner: tunerRoutingApp,
};
