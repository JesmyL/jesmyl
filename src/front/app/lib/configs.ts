import { AppName } from '#basis/model/App.model';
import { bibleRoutingApp } from 'front/components/apps/bible/routing/bibleRoutingApp';
import { cmRoutingApp } from 'front/components/apps/cm/routing/cmRoutingApp';
import { tunerRoutingApp } from 'front/components/apps/tuner/tunerRoutingApp';

export type RoutingAppConfig = {
  appName: AppName;
  footer: React.ReactNode;
  title: React.ReactNode;
  icon: TheIconKnownName;
};

export const routingApps: Partial<Record<AppName, RoutingAppConfig>> = {
  cm: cmRoutingApp,
  bible: bibleRoutingApp,
  tuner: tunerRoutingApp,
};
