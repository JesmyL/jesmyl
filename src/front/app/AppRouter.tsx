import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import { indexIDB } from 'front/components/index/db/index-idb';
import { indexSokiInvocatorBaseClient } from 'front/components/index/db/invocators/invocator.base';
import { indexBasicsSokiInvocatorClient } from 'front/components/index/db/invocators/schedules/fresh-invocator.methods';
import { soki } from 'front/soki';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { DeviceId } from 'shared/api';
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

indexSokiInvocatorBaseClient.$$register();

setTimeout(async () => {
  const lastModified = await indexIDB.get.lastModified();
  indexBasicsSokiInvocatorClient.getFreshes(null, lastModified);

  const localDeviceId = await indexIDB.get.deviceId();
  if (localDeviceId === DeviceId.def) {
    const deviceId = await indexBasicsSokiInvocatorClient.getDeviceId(null);
    indexIDB.set.deviceId(deviceId);
  }
}, 1000);

soki.onUserAuthorize.listen(() => {
  cmIDB.rem.lastModified();
  indexIDB.rem.lastModified();
});
