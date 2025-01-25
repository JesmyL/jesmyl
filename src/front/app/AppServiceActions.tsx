import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TheIconLoading } from '../complect/the-icon/IconLoading';
import { AppName } from './App.model';
import { useInitSoki } from './useInitSoki';

export const scheduleWidgetActionsRouteName = 'app-actions' as const;

const appNameKey = 'a';
const keyKey = 'k';
const valueKey = 'v';

const AppServiceActions = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchParams] = useSearchParams();
  const appName = searchParams.get(appNameKey);

  useInitSoki(appName as AppName);

  useEffect(() => {
    const key = searchParams.get(keyKey);
    const value = searchParams.get(valueKey);

    if (appName === null || key === null || value === null) return;

    setSuccess('');
    setError('');

    return hookEffectLine()
      .setTimeout(async () => {
        try {
          // setSuccess('' + (await serviceMaster(appName as AppName)(key, value)));
        } catch (error) {
          setError('' + error);
        }
      }, 1000)
      .effect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="full-size flex center column">
      <div>
        {error ? (
          <span className="color--ko">{error}</span>
        ) : success ? (
          <span className="color--ok">{success}</span>
        ) : (
          <TheIconLoading />
        )}
      </div>
      <Link
        to={`/${appName === 'index' ? 'cm' : appName}/!other`}
        className="margin-gap"
      >
        На главную
      </Link>
    </div>
  );
};

export const makeAppActionLink = (appName: AppName, key: string, value: string) => {
  const url = new URL(window.location.origin);

  url.pathname = scheduleWidgetActionsRouteName;
  url.searchParams.set(valueKey, value);
  url.searchParams.set(appNameKey, appName);
  url.searchParams.set(keyKey, key);

  return url.toString();
};

export default AppServiceActions;
