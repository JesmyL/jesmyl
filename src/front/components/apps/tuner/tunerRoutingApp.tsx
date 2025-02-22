import { AppFooter } from '@app/AppFooter';
import { AppFooterItem } from '@app/AppFooterItem';
import { RoutingAppConfig } from '@app/routing-apps';
import { Route, Routes } from 'react-router-dom';
import { TheTuner } from './TheTuner';

const footer = (
  <AppFooter>
    <AppFooterItem
      idPostfix="main"
      to="i"
      title="Тюнер"
      icon="DashboardSpeed02"
    />
  </AppFooter>
);

export const tunerRoutingApp: RoutingAppConfig = {
  appName: 'tuner',
  title: 'Тюнер',
  router: mainNode => (
    <>
      <Routes>
        <Route
          path="i"
          element={<TheTuner />}
        />
        {mainNode}
      </Routes>

      {footer}
    </>
  ),
  footer,
  icon: 'DashboardSpeed02',
  level: 0,
  lazies: [<TheTuner />],
};
