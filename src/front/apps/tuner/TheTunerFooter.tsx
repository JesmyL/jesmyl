import { translateBase } from '#basis/locale';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const TheTunerFooter = () => {
  return (
    <AppFooter appName="tuner">
      {() => [
        <AppFooterItem
          key="main"
          idPostfix="main"
          to="/tuner/i"
          title={translateBase(BaseLocaleKey.TunerTitle)}
          icon="DashboardSpeed02"
        />,
      ]}
    </AppFooter>
  );
};
