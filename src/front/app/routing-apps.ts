import { bibleRoutingApp } from 'front/components/apps/bible/routing/bibleRoutingApp';
import { cmRoutingApp } from 'front/components/apps/cm/routing/cmRoutingApp';
import { tunerRoutingApp } from 'front/components/apps/tuner/tunerRoutingApp';
import { AppName } from '../basis/model/App.model';

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
