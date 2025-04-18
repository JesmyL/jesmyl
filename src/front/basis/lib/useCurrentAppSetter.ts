import { AppName } from '#basis/model/App.model';
import { useEffect } from 'react';
import { currentAppNameAtom } from './atoms/currentAppNameAtom';

export const useCurrentAppSetter = (appName: AppName) => {
  useEffect(() => currentAppNameAtom.set(appName), [appName]);
};
