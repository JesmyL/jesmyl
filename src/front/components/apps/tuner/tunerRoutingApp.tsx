import { Route, Routes } from 'react-router-dom';
import AppFooter from '../../../app/AppFooter';
import AppFooterItem from '../../../app/AppFooterItem';
import { RoutingAppConfig } from '../../../app/routing-apps';
import {
  IconDashboardSpeed02StrokeRounded,
  iconPackOfDashboardSpeed02,
} from '../../../complect/the-icon/icons/dashboard-speed-02';
import TheTuner from './TheTuner';

const footer = (
  <AppFooter>
    <AppFooterItem
      idPostfix="main"
      to="i"
      title="Тюнер"
      iconPack={iconPackOfDashboardSpeed02}
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
  Icon: IconDashboardSpeed02StrokeRounded,
  level: 0,
  lazies: [<TheTuner />],
};
