import { bibleTranslatesIDB } from 'front/components/apps/bible/_db/bibleIDB';
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

const AppComponent = React.lazy(() => import('./AppComponent'));
const AppRouterProvider = React.lazy(() => import('./AppRouterProvider'));
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

soki.listenOnOpenEvent(async () => {
  const lastModified = await indexIDB.get.lastModifiedAt();
  indexBasicsSokiInvocatorClient.getFreshes(null, lastModified);

  const localDeviceId = await indexIDB.get.deviceId();
  if (localDeviceId === DeviceId.def) {
    const deviceId = await indexBasicsSokiInvocatorClient.getDeviceId(null);
    indexIDB.set.deviceId(deviceId);
  }
});

const resetLastModifiedAt = () => {
  cmIDB.remove.lastModifiedAt();
  indexIDB.remove.lastModifiedAt();
  bibleTranslatesIDB.remove.lastModifiedAt();
};

indexIDB.hook('creating', key => {
  if (key !== 'auth') return;
  resetLastModifiedAt();
});

indexIDB.hook('updating', (_, key) => {
  if (key !== 'auth') return;
  resetLastModifiedAt();
});
