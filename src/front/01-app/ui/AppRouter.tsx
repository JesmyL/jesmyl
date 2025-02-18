import { AppName } from '#basis/model/App.model';
import { atom, useAtomValue } from 'front/08-shared/lib/atoms';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

const AppComponent = React.lazy(() => import('../../03-pages/+app/AppComponent'));
const AppRouterProvider = React.lazy(() => import('./AppRouterProvider'));
const ScheduleWidgetTgDayView = React.lazy(() => import('../../04-widgets/schedule/general/TgDayView'));

export const AppRouter = () => {
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
