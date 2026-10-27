import { translateBase } from '#basis/locale';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const PresentationsFooter = () => {
  return (
    <AppFooter appName="presentations">
      {() => [
        <AppFooterItem
          key="main"
          idPostfix="main"
          to="/presentations/i/"
          title={translateBase(BaseLocaleKey.Presentations)}
          icon="Presentation01"
        />,
      ]}
    </AppFooter>
  );
};
