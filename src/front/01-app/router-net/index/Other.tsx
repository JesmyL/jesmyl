import IndexOtherPage from '#pages/index/Other';
import { routingApps } from '#processes/routers';
import ScheduleWidgetListPage from '#widgets/schedule/general/ListPage';
import { useCurrentApp } from 'front/components/index/atoms';
import IndexActions from 'front/components/index/parts/actions/Actions';
import IndexSettings from 'front/components/index/parts/settings/Settings';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const IndexAuthorization = React.lazy(() => import('front/components/index/parts/login/IndexAuthorization'));

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
        element={<IndexActions />}
      />

      <Route
        path="login/*"
        element={
          <Suspense>
            <IndexAuthorization />
          </Suspense>
        }
      />

      <Route
        path="settings/*"
        element={<IndexSettings />}
      />

      <Route
        path="schs/*"
        element={<ScheduleWidgetListPage />}
      />
    </Routes>
  );
}
