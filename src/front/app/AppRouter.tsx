import { schSokiInvocatorBaseClient } from 'front/complect/schedule-widget/invocators/invocator.base';
import { indexIDB } from 'front/components/index/db/index-idb';
import { indexFreshSokiInvocatorClient } from 'front/components/index/db/invocators/schedules/fresh-invocator.methods';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { atom, useAtomValue } from '../complect/atoms';
import { AppName } from './App.model';
import { scheduleWidgetActionsRouteName } from './AppServiceActions';

const AppComponent = React.lazy(() => import('./AppComponent'));
const AppRouterProvider = React.lazy(() => import('./AppRouterProvider'));
const AppServiceActions = React.lazy(() => import('./AppServiceActions'));
const Wedding = React.lazy(() => import('../components/apps/wedding/Wedding'));
const ScheduleWidgetTgDayView = React.lazy(() => import('../complect/schedule-widget/general/TgDayView'));

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppComponent />}>
        <Route
          path=":appName/*"
          element={<AppRouterProvider />}
        />
        <Route
          path="schedule-day/*"
          element={
            <Suspense>
              <ScheduleWidgetTgDayView />
            </Suspense>
          }
        />
        <Route
          path="schedule-day/:schw/*"
          element={
            <Suspense>
              <ScheduleWidgetTgDayView />
            </Suspense>
          }
        />
      </Route>
      <Route
        path={scheduleWidgetActionsRouteName}
        element={<AppServiceActions />}
      />
      <Route
        path="wedding/:weddn/*"
        element={<Wedding />}
      />
      <Route
        path="*"
        element={<Redirect />}
      />
    </Routes>
  );
};

const Redirect = () => {
  const appName = useAtomValue(appNameAtom);
  const navigate = useNavigate();

  useEffect(() => {
    return hookEffectLine()
      .setTimeout(() => {
        if (window.location.pathname.split('/').length > 1) return;
        navigate(`/${appName}/i`);
      }, 500)
      .effect();
  }, [appName, navigate]);

  return <></>;
};

const appNameAtom = atom<AppName>('cm');

export default AppRouter;

schSokiInvocatorBaseClient.$$register();

setTimeout(async () => {
  const lastModified = await indexIDB.getSingleValue('lastModified', 0);
  indexFreshSokiInvocatorClient.getFreshes(null, lastModified);
}, 1000);
