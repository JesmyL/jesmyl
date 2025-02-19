import { AppFooter } from 'front/app/AppFooter';
import { AppFooterItem } from 'front/app/AppFooterItem';
import { Route, Routes } from 'react-router-dom';
import { RoutingAppConfig } from '../../../app/routing-apps';
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
