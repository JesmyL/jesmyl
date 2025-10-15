import { AppName } from '#basis/model/App.model';
import { bibleRoutingApp } from '$bible/app/bibleRoutingApp';
import { cmRoutingApp } from '$cm/shared/const';
import { questionerRoutingApp } from '$q/questionerRoutingApp';
import { tunerRoutingApp } from '$tuner/tunerRoutingApp';

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
