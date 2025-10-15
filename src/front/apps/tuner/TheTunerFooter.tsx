import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';

export const TheTunerFooter = () => {
  return (
    <AppFooter appName="tuner">
      <AppFooterItem
        idPostfix="main"
        to="/tuner/i"
        title="Тюнер"
        icon="DashboardSpeed02"
      />
    </AppFooter>
  );
};
