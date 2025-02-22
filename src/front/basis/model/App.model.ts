import { SokiAppName, sokiAppNames } from 'shared/api';

export type AppName = SokiAppName;
export const appNames = sokiAppNames;

export const getAppNameFromString = (appNameStr: string) =>
  appNames.includes(appNameStr as never) ? (appNameStr as AppName) : null;
