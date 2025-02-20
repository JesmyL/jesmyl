import { bibleRoutingApp } from '@bible/exports';
import { cmRoutingApp } from '@cm/exports';
import { tunerRoutingApp } from '@tuner/exports';
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
