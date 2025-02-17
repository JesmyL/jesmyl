import { SokiAppName, sokiAppNames } from 'shared/api';

export type AppName = SokiAppName;
export const appNames = sokiAppNames;

export const getAppNameFromString = (appNameStr: string) =>
  appNames.includes(appNameStr as never) ? (appNameStr as AppName) : null;

export type RoutingAppConfig = {
  appName: AppName;
  router: (mainNode: React.ReactNode) => React.ReactNode;
  footer: React.ReactNode;
  title: React.ReactNode;
  icon: TheIconKnownName;
  lazies: React.ReactNode[];
  level: number;
};

export type AppsRoutingAppConfigDict = PRecord<AppName, RoutingAppConfig>;
