import { AppName } from '#basis/model/App.model';
import { bibleRoutingApp } from '$bible/app/bibleRoutingApp';
import { cmRoutingApp } from '$cm/routing/cmRoutingApp';
import { tunerRoutingApp } from 'front/components/apps/tuner/tunerRoutingApp';
import { StameskaIconName } from 'stameska-icon';

export type RoutingAppConfig = {
  appName: AppName;
  footer: React.ReactNode;
  title: React.ReactNode;
  icon: StameskaIconName;
};

export const routingApps: Partial<Record<AppName, RoutingAppConfig>> = {
  cm: cmRoutingApp,
  bible: bibleRoutingApp,
  tuner: tunerRoutingApp,
};
