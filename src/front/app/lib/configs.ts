import { AppName } from '#basis/model/App.model';
import { bibleRoutingApp } from '$bible/app/bibleRoutingApp';
import { cmRoutingApp } from '$cm/shared/const';
import { gamerRoutingApp } from '$gamer/app/gamerRoutingApp';
import { questionerRoutingApp } from '$q/app/questionerRoutingApp';
import { presentationsRoutingApp } from '$presentations/app/presentationsRoutingApp';
import { remoteRoutingApp } from '$remote/remoteRoutingApp';
import { storagesRoutingApp } from '$storages/app/storagesRoutingApp';
import { tunerRoutingApp } from '$tuner/tunerRoutingApp';

export type RoutingAppConfig = {
  appName: AppName | 'remote';
  footer: React.ReactNode;
  title: () => React.ReactNode;
  icon: KnownStameskaIconName;
};

export const routingApps: Partial<Record<AppName | 'remote', RoutingAppConfig>> = {
  cm: cmRoutingApp,
  bible: bibleRoutingApp,
  tuner: tunerRoutingApp,
  q: questionerRoutingApp,
  storages: storagesRoutingApp,
  gamer: gamerRoutingApp,
  presentations: presentationsRoutingApp,
  remote: remoteRoutingApp,
};
