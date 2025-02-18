import { routingApps } from '#app/ui/AppRouterProvider';
import { IndexOtherPage } from '#pages/index';
import IndexActionsPage from '#pages/index/ui/ActionsPage';
import ScheduleWidgetListPage from '#widgets/schedule/general/ListPage';
import { useCurrentApp } from 'front/components/index/atoms';
import IndexSettingsPage from 'front/components/index/parts/settings/SettingsPage';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const IndexTelegramAuthPage = React.lazy(() => import('front/components/index/parts/login/IndexTelegramAuthPage'));

export default function IndexOtherRoute() {
  const currentAppName = useCurrentApp();

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <IndexOtherPage routingApps={routingApps} />
            {currentAppName && routingApps[currentAppName]?.footer}
          </>
        }
      />

      <Route
        path="actions/*"
        element={<IndexActionsPage />}
      />

      <Route
        path="login/*"
        element={
          <Suspense>
            <IndexTelegramAuthPage />
          </Suspense>
        }
      />

      <Route
        path="settings/*"
        element={<IndexSettingsPage />}
      />

      <Route
        path="schs/*"
        element={<ScheduleWidgetListPage />}
      />
    </Routes>
  );
}
