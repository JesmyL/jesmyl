import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppName } from './App.model';

export const useInitSoki = (topAppName?: AppName) => {
  const params = useParams();
  const appName = (topAppName ?? params.appName ?? 'index') as AppName;

  useEffect(() => {
    if (appName === undefined) return;

    return (
      hookEffectLine()
        // .setTimeout(() => soki.makeInitialRequests(appName), 500)
        .effect()
    );
  }, [appName]);
};
