import { AppName } from '#basis/model/App.model';
import { bibleRoutingApp } from '$bible/app/bibleRoutingApp';
import { questionerRoutingApp } from '$q/questionerRoutingApp';
import { cmRoutingApp } from 'front/apps/cm/07-shared/const/cmRoutingApp';
import { tunerRoutingApp } from 'front/components/apps/tuner/tunerRoutingApp';

export type RoutingAppConfig = {
  appName: AppName;
  footer: React.ReactNode;
  title: React.ReactNode;
  icon: KnownStameskaIconName;
};

export const routingApps: Partial<Record<AppName, RoutingAppConfig>> = {
  cm: cmRoutingApp,
  bible: bibleRoutingApp,
  tuner: tunerRoutingApp,
  q: questionerRoutingApp,
};
