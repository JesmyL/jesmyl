import { translateBase } from '#basis/locale';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const GamerFooter = () => {
  return (
    <AppFooter appName="gamer">
      {() => [
        <AppFooterItem
          idPostfix="main"
          key="main"
          to="/gamer/i/"
          title={translateBase(BaseLocaleKey.Games)}
          icon="GameController03"
        />,
      ]}
    </AppFooter>
  );
};
